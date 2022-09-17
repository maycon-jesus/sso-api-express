import { PromiseResolveData } from './../types/promise-resolve'
import { Controller } from '../base/Controller'
import { Prisma, User } from '@prisma/client'
import Joi from 'joi'

export class UsersController extends Controller {
    private _validateUpdateUserInfoBasicData = Joi.object({
        firstName: Joi.string().max(255).trim().required(),
        lastName: Joi.string().max(255).trim().required()
    }).required()

    async getById (id: number, select?:Prisma.UserSelect):Promise<PromiseResolveData<Partial<User>>> {
        const user = await this.dd.database.db.user.findFirst({
            where: {
                id
            },
            select: select || undefined
        })

        if (user) {
            return {
                code: 200,
                data: user
            }
        } else {
            return {
                code: 404,
                message: 'Usuário não encontrado'
            }
        }
    }

    async updateInfoBasic (id: number, data:Object):Promise<PromiseResolveData<{success: boolean}>> {
        const dataValidated = this._validateUpdateUserInfoBasicData.validate(data)
        if (dataValidated.error) {
            return {
                code: 400,
                message: dataValidated.error.message
            }
        }

        await this.dd.database.db.user.update({
            data: {
                firstName: dataValidated.value.firstName,
                lastName: dataValidated.value.lastName
            },
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
}
