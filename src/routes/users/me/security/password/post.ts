import { Route, RouteMethods } from '../../../../../base/Route'

export default class extends Route {
    protected method: RouteMethods = 'post'

    init () {
        this.router.use('/', (req, res) => {
            this.dd.controllers.auth.changePassword(req.jwtPayload.userId, req.body)
                .then(changePassword => {
                    if (changePassword.code === 200 && changePassword.data.success) {
                        res.json({ success: true })
                    } else {
                        res.status(changePassword.code).json({ message: changePassword.message })
                    }
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [5n53A9nY]' })
                })
        })
    }
}
