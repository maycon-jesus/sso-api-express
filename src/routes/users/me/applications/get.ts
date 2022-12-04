import { Route, RouteMethods } from '../../../../base/Route'
import { userHasPermissionInApp } from '../../../../middlewares/userHasPermissionInApp'

export default class ApplicationsGetByIdRoute extends Route {
    protected path: string = '/:appId'
    protected method: RouteMethods = 'get'

    constructor () {
        super({
            middlewares: [
                userHasPermissionInApp()
            ]
        })
    }

    init () {
        this.router.use<{appId: string}>('/', (req, res) => {
            this.dd.controllers.applications.getById(Number(req.params.appId), {
                id: true,
                name: true,
                secretKey: true,
                ApplicationRedirectUrlAllowed: {
                    select: {
                        id: true,
                        url: true,
                        createdAt: true
                    }
                }
            })
                .then((app) => {
                    if (app.code === 200) {
                        app.data.id = app.data.id?.toString() as any
                        res.json(app.data)
                    } else {
                        res.status(app.code).json({ message: app.message })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 9OT37M62]' })
                })
        })
    }
}
