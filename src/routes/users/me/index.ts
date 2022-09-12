import { UsersMeRouteGet } from './get'
import { Route } from '../../../base/Route'
import UsersMeApplicationsRoute from './applications'

export class UsersMeRoute extends Route {
    protected path: string = '/me'

    constructor () {
        super({
            childs: [
                new UsersMeRouteGet(),
                new UsersMeApplicationsRoute()
            ]
        })
    }
}
