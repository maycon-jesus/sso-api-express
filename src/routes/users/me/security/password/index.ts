import { Route } from '../../../../../base/Route'
import { checkUserLogged } from '../../../../../middlewares/userLogged'
import RoutePost from './post'

export default class extends Route {
    protected path: string = '/password'

    constructor () {
        super({
            middlewares: [
                checkUserLogged()
            ],
            childs: [
                new RoutePost()
            ]
        })
    }
}
