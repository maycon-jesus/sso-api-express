import { IRouteDependencys } from './../types/global-dependencys'
import express from 'express'
import { getDependencysOfContext } from '../libs/DependencysManager'

export type RouteMethods = 'get'|'post'|'put'|'delete'|'patch'|'use'

export abstract class Route {
    public router: express.Router
    protected dd: IRouteDependencys
    protected path: string = '/'
    protected method: RouteMethods = 'use'

    constructor (config: {
        childs?: Route[],
        middlewares?:any[]
    } = {}) {
        this.router = express.Router({
            mergeParams: true
        })
        this.dd = getDependencysOfContext('route')

        config.middlewares?.forEach(middleware => {
            this.router.use(middleware)
        })

        config.childs?.forEach(child => {
            this.router[child.method](child.path, child.router)
        })

        if (this.init) {
            this.init()
        }
    }

    init? (): void
}
