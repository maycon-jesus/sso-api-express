import { Route, RouteMethods } from '../../../../base/Route'

export default class ApplicationsListRoute extends Route {
    protected method: RouteMethods = 'get'

    init () {
        this.router.use<{appId: string}>('/', (req, res) => {
            this.dd.controllers.applications.list(undefined, {
                ownerUserId: req.jwtPayload.userId
            })
                .then((app) => {
                    if (app.code === 200) {
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
