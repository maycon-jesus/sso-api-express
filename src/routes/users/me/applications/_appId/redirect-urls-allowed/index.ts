import { ApplicationRmRedirectUrlAllowed } from './delete'
import { ApplicationAddRedirectUrlAllowed } from './post'
import { Route } from '../../../../../../base/Route'

export default class ApplicationRedirectUrlsAllowed extends Route {
    protected path: string = '/redirect-urls-allowed'

    constructor () {
        super({
            childs: [
                new ApplicationAddRedirectUrlAllowed(),
                new ApplicationRmRedirectUrlAllowed()
            ]
        })
    }
}
