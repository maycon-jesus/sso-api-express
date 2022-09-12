import { Route, RouteMethods } from '../../base/Route'
import { checkUserLogged } from '../../middlewares/userLogged'

export class OAuth2TokenRoute extends Route {
    protected path: string = '/token'
    protected method: RouteMethods = 'post'

    constructor () {
        super({
            middlewares: [checkUserLogged()]
        })
    }

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
