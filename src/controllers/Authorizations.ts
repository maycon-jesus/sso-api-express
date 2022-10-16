import { Controller } from '../base/Controller'
import joi from 'joi'
import { v4 } from 'uuid'
import { PromiseResolveData } from '../types/promise-resolve'
import jsonwebtoken from 'jsonwebtoken'

export class AuthorizationsController extends Controller {
    private _authAppDataValidator = joi.object({
        clientId: joi.number().integer().positive().required(),
        scopes: joi.array().items(joi.equal('email')).default([])
    }).required()

    private _codeToTokenDataValidator = joi.object({
        code: joi.string().uuid({ version: 'uuidv4' }).required(),
        clientId: joi.number().integer().positive().required(),
        appSecretKey: joi.string().uuid({ version: 'uuidv4' }).required()
    }).required()

    async authApp (userId: number, data:Object):Promise<PromiseResolveData<{
        id: number,
        code: string
    }>> {
        const dataValid = this._authAppDataValidator.validate(data)
        if (dataValid.error) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const code = v4()

        const { id } = await this.dd.database.db.authorizations.create({
            select: {
                id: true
            },
            data: {
                appId: dataValid.value.clientId,
                userId,
                code,
                codeExpiresOn: Date.now() + 60000,
                AuthorizationScopes: {
                    create: dataValid.value.scopes.map((s:string) => ({ name: s }))
                }
            }
        })

        return {
            code: 200,
            data: {
                id,
                code
            }
        }
    }

    async codeToToken (data:Object):Promise<PromiseResolveData<{
        token: string
    }>> {
        const dataValid = this._codeToTokenDataValidator.validate(data)
        if (dataValid.error) {
            return {
                code: 400,
                message: dataValid.error.message
            }
        }

        const authorization = await this.dd.database.db.authorizations.findFirst({
            select: {
                id: true,
                userId: true,
                codeExpiresOn: true,
                AuthorizationScopes: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                code: dataValid.value.code,
                App: {
                    id: dataValid.value.clientId,
                    secretKey: dataValid.value.appSecretKey
                }
            }
        })

        if (!authorization) {
            return {
                code: 403,
                message: 'Payload inválido!'
            }
        }

        if (authorization.codeExpiresOn < Date.now()) {
            return {
                code: 404,
                message: 'Código inválido!'
            }
        }

        await this.dd.database.db.authorizations.update({
            data: {
                code: null
            },
            where: {
                id: authorization.id
            }
        })

        const token = jsonwebtoken.sign({
            userId: authorization.userId,
            oauth2: true,
            scopes: authorization.AuthorizationScopes.map(scope => scope.name)
        }, process.env.JWT_SECRET!, {
            audience: 'Maycon Jesus SSO',
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
