import { Route, RouteMethods } from '../../../../../../base/Route'

export class ApplicationAddRedirectUrlAllowed extends Route {
    protected method: RouteMethods = 'post'

    init () {
        this.router.use<{
            appId: string
        }>('/', (req, res) => {
            this.dd.controllers.applications.addRedirectUrl(Number(req.params.appId), req.body)
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
