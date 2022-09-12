import { Applications, Prisma } from '@prisma/client'
import { Controller } from '../base/Controller'
import joi from 'joi'
import { PromiseResolveData } from '../types/promise-resolve'
import { v4 } from 'uuid'

export class ApplicationsController extends Controller {
    private _validateCreateData = joi.object<{
        name:string
    }>({
        name: joi.string().max(255).required()
    })

    async create (ownerUserId: number, data:Object): Promise<PromiseResolveData<{
        id: number
    }>> {
        const dataValid = this._validateCreateData.validate(data)
        if (dataValid.error) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const app = await this.dd.database.db.applications.create({
            data: {
                ...dataValid.value,
                ownerUserId,
                secretKey: v4()
            },
            select: {
                id: true
            }
        })

        return {
            code: 200,
            data: app
        }
    }

    async getById (id:number, select?:Prisma.ApplicationsSelect):Promise<PromiseResolveData<Partial<Applications>>> {
        const app = await this.dd.database.db.applications.findFirst({
            where: {
                id
            },
            select: select || undefined
        })

        if (app) {
            return {
                code: 200,
                data: app
            }
        } else {
            return {
                code: 404,
                message: 'Aplicação não encontrada'
            }
        }
    }

    async list (select: Prisma.ApplicationsSelect|undefined, where: Prisma.ApplicationsWhereInput):Promise<PromiseResolveData<Partial<Applications>[]>> {
        const app = await this.dd.database.db.applications.findMany({
            select,
            where
        })

        return {
            code: 200,
            data: app
        }
    }

    async delete (id: number):Promise<PromiseResolveData<{success: boolean}>> {
        await this.dd.database.db.applications.delete({
            where: {
                id
            }
        })

        return {
            code: 200,
            data: {
                success: true
            }
        }
    }

    async userHasPermission (userId:Number, appId: number):Promise<PromiseResolveData<{hasPermission: boolean}>> {
        const app = await this.getById(appId, { ownerUserId: true })
        if (app.code !== 200) {
            return {
                code: app.code,
                message: app.message
            }
        }

        if (app.data.ownerUserId !== userId) {
            return {
                code: 200,
                data: {
                    hasPermission: false
                }
            }
        }

        return {
            code: 200,
            data: {
                hasPermission: true
            }
        }
    }
}
