import { ApplicationUpdateRoute } from './update'
import { Route } from '../../../../../base/Route'
import { userHasPermissionInApp } from '../../../../../middlewares/userHasPermissionInApp'
import ApplicationRedirectUrlsAllowed from './redirect-urls-allowed'

export class ApplicationRoute extends Route {
    protected path: string = '/:appId'

    constructor () {
        super({
            middlewares: [
                userHasPermissionInApp()
            ],
            childs: [
                new ApplicationRedirectUrlsAllowed(),
                new ApplicationUpdateRoute()
            ]
        })
    }
}
