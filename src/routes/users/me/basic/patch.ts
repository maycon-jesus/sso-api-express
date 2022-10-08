import { Route, RouteMethods } from '../../../../base/Route'

export default class extends Route {
    protected method: RouteMethods = 'patch'

    init () {
        this.router.use('/', (req, res) => {
            this.dd.controllers.users.updateInfoBasic(req.jwtPayload.userId, req.body)
                .then(update => {
                    if (update.code === 200) {
                        res.json({ success: true })
                    } else {
                        res.status(update.code).json({ message: update.message })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 29kpeyj9]' })
                })
        })
    }
}
