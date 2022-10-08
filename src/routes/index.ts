import { UsersRoute } from './users/index'
import { Route } from '../base/Route'
import { AuthRoute } from './auth'
import RegisterRoute from './register'
import ApplicationsRoute from './applications'
import OAuth2Route from './oauth2'

export default class extends Route {
    constructor () {
        super({
            childs: [
                new RegisterRoute(),
                new AuthRoute(),
                new UsersRoute(),
                new ApplicationsRoute(),
                new OAuth2Route()
            ]
        })
    }

    init () {
        this.router.use('/', (req, res) => {
            res.json({ ok: true })
        })
    }
}
