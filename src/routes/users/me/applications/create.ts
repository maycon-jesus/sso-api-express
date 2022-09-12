import { Route, RouteMethods } from '../../../../base/Route'

export default class ApplicationsCreateRoute extends Route {
    protected method: RouteMethods = 'post'

    init () {
        this.router.use('/', (req, res) => {
            this.dd.controllers.applications.create(req.jwtPayload.userId, req.body)
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
