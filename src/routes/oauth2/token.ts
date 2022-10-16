import { Route, RouteMethods } from '../../base/Route'

export class OAuth2TokenRoute extends Route {
    protected path: string = '/token'
    protected method: RouteMethods = 'post'
    init (): void {
        this.router.use('/', (req, res) => {
            this.dd.controllers.authorizations.codeToToken(req.body)
                .then(auth => {
                    if (auth.code !== 200) return res.status(auth.code).json({ message: auth.message })
                    res.json({
                        token: auth.data.token
                    })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 7FDTS7C5]' })
                })
        })
    }
}
