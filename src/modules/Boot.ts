import { Controllers } from './Controllers'
import { Database } from './Database'
import { setDependency } from '../libs/DependencysManager'
import { Server } from './Server'
import { Router } from './Router'

export class BootManager {
    server: Server
    database: Database
    router: Router
    controllers: Controllers

    constructor () {
        this.server = new Server()
        setDependency('global', 'server', this.server)

        this.database = new Database()
        setDependency(['controller'], 'database', this.database)

        this.router = new Router(this.server)
        setDependency('route', 'router', this.router)

        this.controllers = new Controllers()
        setDependency(['route', 'middleware'], 'controllers', this.controllers)
    }

    async boot () {
        this.server.listen(Number(process.env.PORT))
    }
}
