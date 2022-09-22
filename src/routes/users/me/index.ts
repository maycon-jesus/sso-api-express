import { UsersMeRouteGet } from './get'
import { Route } from '../../../base/Route'
import UsersMeApplicationsRoute from './applications'
import RouteBasic from './basic'
import RouteSecurity from './security'

export class UsersMeRoute extends Route {
    protected path: string = '/me'

    constructor () {
        super({
            childs: [
                new UsersMeRouteGet(),
                new UsersMeApplicationsRoute(),
                new RouteBasic(),
                new RouteSecurity()
            ]
        })
    }
}
