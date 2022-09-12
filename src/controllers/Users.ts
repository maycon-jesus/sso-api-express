import { PromiseResolveData } from './../types/promise-resolve'
import { Controller } from '../base/Controller'
import { Prisma, User } from '@prisma/client'

export class UsersController extends Controller {
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
}
