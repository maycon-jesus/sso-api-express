import express from 'express'
import http from 'http'

export class Server {
    public app:express.Express
    public httpServer: http.Server

    constructor () {
        this.app = express()
        this.httpServer = http.createServer(this.app)
    }

    listen (port:number) {
        this.httpServer.listen(port)
        console.log(`Servidor ligado! PORTA ${port}`)
    }
}
