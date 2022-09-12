import { Route } from '../../base/Route'
import { AuthLoginRoute } from './login'

export class AuthRoute extends Route {
    protected path: string = '/auth'

    constructor () {
        super({
            childs: [
                new AuthLoginRoute()
            ]
        })
    }
}
