import joi from 'joi'
import { Controller } from '../base/Controller'
import { PromiseResolveData } from '../types/promise-resolve'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthController extends Controller {
    private _loginDataValidator = joi.object<{
        email:string,
        password:string
    }>({
        email: joi.string().email().trim().required(),
        password: joi.string().required()
    }).required()

    private _changePasswordDataValidator = joi.object({
        oldPassword: joi.string().required().max(255),
        newPassword: joi.string().required().max(255)
    }).required()

    async login (data: Object):Promise<PromiseResolveData<{
        token: string
    }>> {
        const dataValid = this._loginDataValidator.validate(data)
        if (dataValid.error) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const account = await this.dd.database.db.user.findFirst({
            where: {
                email: dataValid.value.email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        if (!account) {
            return {
                code: 403,
                message: 'Email ou senha incorretos'
            }
        }

        const passwordCorrect = bcrypt.compareSync(dataValid.value.password, account.password)
        if (!passwordCorrect) {
            return {
                code: 403,
                message: 'Email ou senha incorretos'
            }
        }

        const token = jsonwebtoken.sign({
            userId: account.id
        }, process.env.JWT_SECRET!, {
            audience: 'Maycon Jesus Clients',
            expiresIn: '1y',
            issuer: 'Maycon Jesus'
        })

        return {
            code: 200,
            data: {
                token
            }
        }
    }

    async changePassword (userId:number, data: Object) :Promise<PromiseResolveData<{
        success:boolean
    }>> {
        const dataValid = this._changePasswordDataValidator.validate(data)
        if (dataValid.error?.message) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const user = await this.dd.database.db.user.findFirst({
            where: { id: userId },
            select: { password: true }
        })
        if (!user) {
            return {
                code: 404,
                message: 'Usuário não encontrado'
            }
        }

        const oldPasswordCorrect = bcrypt.compareSync(dataValid.value.oldPassword, user.password)
        if (!oldPasswordCorrect) {
            return {
                code: 403,
                message: 'A sua senha atual esta incorreta!'
            }
        }

        await this.dd.database.db.user.update({
            data: {
                password: bcrypt.hashSync(dataValid.value.newPassword, 14)
            },
            where: { id: userId }
        })

        return {
            code: 200,
            data: {
                success: true
            }
        }
    }
}
