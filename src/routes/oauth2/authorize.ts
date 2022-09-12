import { Route, RouteMethods } from '../../base/Route'
import { checkUserLogged } from '../../middlewares/userLogged'

export class AuthorizeOAuth2Route extends Route {
    protected path: string = '/authorize'
    protected method: RouteMethods = 'post'

    constructor () {
        super({
            middlewares: [checkUserLogged()]
        })
    }

    init (): void {
        this.router.use('/', (req, res) => {
            this.dd.controllers.authorizations.authApp(req.jwtPayload.userId, req.body)
                .then(auth => {
                    if (auth.code !== 200) return res.status(auth.code).json({ message: auth.message })
                    res.json({
                        code: auth.data.code
                    })
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 7FDTS7C5]' })
                })
        })
    }
}
