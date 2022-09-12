import { Route, RouteMethods } from '../../base/Route'

export default class RegisterRoute extends Route {
    protected method: RouteMethods = 'post'
    protected path: string = '/register'

    init () {
        this.router.use('/', (req, res) => {
            this.dd.controllers.register.registerUser(req.body)
                .then((user) => {
                    if (user.code === 200) {
                        res.json({
                            id: user.data.id
                        })
                    } else {
                        res.status(user.code).json({ message: user.message })
                    }
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 5F3EA1J2]' })
                })
        })
    }
}
