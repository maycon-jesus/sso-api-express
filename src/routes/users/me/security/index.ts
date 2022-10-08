import { Route } from '../../../../base/Route'
import RoutePassword from './password/index'

export default class extends Route {
    protected path: string = '/security'

    constructor () {
        super({
            childs: [
                new RoutePassword()
            ]
        })
    }
}
