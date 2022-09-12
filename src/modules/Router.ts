import { corsMiddleware } from '../middlewares/cors'
import RouteRoot from '../routes/index'
import { Server } from './Server'
import express from 'express'

export class Router {
    router = express.Router()
    routeRoot: RouteRoot

    constructor (server:Server) {
        this.routeRoot = new RouteRoot()

        this.setupMiddlewares()

        server.app.use(this.router)
    }

    setupMiddlewares () {
        this.router.use(corsMiddleware)
        this.router.use(express.json())
        this.router.use(express.urlencoded({ extended: true }))

        this.setupRoutes()
    }

    setupRoutes () {
        this.router.use(this.routeRoot.router)
    }
}
