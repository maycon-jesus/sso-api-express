import { Route } from '../../../../base/Route'
import { checkUserLogged } from '../../../../middlewares/userLogged'
import RoutePatch from './patch'

export default class extends Route {
    protected path: string = '/basic'

    constructor () {
        super({
            childs: [
                new RoutePatch()
            ],
            middlewares: [
                checkUserLogged()
            ]
        })
    }
}
