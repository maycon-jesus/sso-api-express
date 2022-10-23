import { ApplicationRoute } from './_appId/index'
import { Route } from '../../../../base/Route'
import { checkUserLogged } from '../../../../middlewares/userLogged'
import ApplicationsCreateRoute from './create'
import ApplicationsDeleteRoute from './delete'
import ApplicationsGetByIdRoute from './get'
import ApplicationsListRoute from './list'

export default class UsersMeApplicationsRoute extends Route {
    protected path: string = '/applications'

    constructor () {
        super({
            middlewares: [
                checkUserLogged()
            ],
            childs: [
                new ApplicationsCreateRoute(),
                new ApplicationsListRoute(),
                new ApplicationsGetByIdRoute(),
                new ApplicationsDeleteRoute(),
                new ApplicationRoute()
            ]
        })
    }
}
