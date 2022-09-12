import { Controller } from '../base/Controller'
import joi from 'joi'
import { PromiseResolveData } from '../types/promise-resolve'
import bcrypt from 'bcrypt'
import hashMD5 from 'crypto-js/md5'

export class RegisterController extends Controller {
    private _validateRegisterUserData = joi.object<{
        firstName:string,
        lastName: string,
        email:string,
        password: string
    }>({
        firstName: joi.string().max(255).trim().required(),
        lastName: joi.string().max(255).trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).required()
    }).required()

    async registerUser (data:Object):Promise<PromiseResolveData<{
        id: Number
    }>> {
        const dataValid = this._validateRegisterUserData.validate(data)
        if (dataValid.error) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const passwordHash = bcrypt.hashSync(dataValid.value.password, 14)

        const { id } = await this.dd.database.db.user.create({
            data: {
                ...dataValid.value,
                password: passwordHash,
                avatarUrl: hashMD5(dataValid.value.email).toString()
            },
            select: {
                id: true
            }
        })

        return {
            code: 200,
            data: {
                id
            }
        }
    }
}
