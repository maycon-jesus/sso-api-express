import { UsersMeRoute } from './me/index'
import { Route } from '../../base/Route'

export class UsersRoute extends Route {
    protected path: string = '/users'

    constructor () {
        super({
            childs: [
                new UsersMeRoute()
            ]
        })
    }
}
