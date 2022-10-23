import { Route, RouteMethods } from '../../../../../../base/Route'

export class ApplicationRmRedirectUrlAllowed extends Route {
    protected path: string = '/:redirectId'
    protected method: RouteMethods = 'delete'

    init () {
        this.router.use<{
            appId: string,
            redirectId: string
        }>('/', (req, res) => {
            this.dd.controllers.applications.rmRedirectUrl(Number(req.params.appId), Number(req.params.redirectId))
                .then(r => {
                    if (r.code === 200) {
                        res.json(r.data)
                    } else {
                        res.status(r.code).json({
                            message: r.message
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 809H0DY3]' })
                })
        })
    }
}
