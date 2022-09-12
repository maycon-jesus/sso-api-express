import { Route } from '../../base/Route'
import { ApplicationsGetByIdRoute } from './getById'

export default class ApplicationsRoute extends Route {
    protected path: string = '/applications'

    constructor () {
        super({
            childs: [
                new ApplicationsGetByIdRoute()
            ]
        })
    }
}
