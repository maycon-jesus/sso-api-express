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
}
