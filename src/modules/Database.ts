import { PrismaClient } from '@prisma/client'

export class Database {
    public db: PrismaClient

    constructor () {
        this.db = new PrismaClient()
    }
}
