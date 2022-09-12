import { Controllers } from './../modules/Controllers'
import { Database } from '../modules/Database'
import { Server } from './../modules/Server'

type globalDependencys = {
    server: Server
}

type routeDependencys = {
    router: Database
    controllers: Controllers
}

type controllerDependencys = {
    database: Database
}

type middlewareDependencys = {
    controllers: Controllers
}

export type IGlobalDependencys = globalDependencys
export type IRouteDependencys = globalDependencys & routeDependencys
export type IControllerDependencys = globalDependencys & controllerDependencys
export type IMiddlewareDependencys = globalDependencys & middlewareDependencys
