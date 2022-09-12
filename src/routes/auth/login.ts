import { Route, RouteMethods } from '../../base/Route'

export class AuthLoginRoute extends Route {
    protected path: string = '/login'
    protected method: RouteMethods = 'post'

    init () {
        this.router.use('/', (req, res) => {
            this.dd.controllers.auth.login(req.body)
                .then(data => {
                    if (data.code === 200) {
                        res.json({
                            token: data.data.token
                        })
                    } else {
                        res.status(data.code).json({ message: data.message })
                    }
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 2VHX3CJQ]' })
                })
        })
    }
}
