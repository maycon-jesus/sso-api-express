import { UserInfoOauth2Route } from './userinfo'
import { OAuth2TokenRoute } from './token'
import { AuthorizeOAuth2Route } from './authorize'
import { Route } from '../../base/Route'

export default class OAuth2Route extends Route {
    protected path: string = '/oauth2'

    constructor () {
        super({
            childs: [
                new AuthorizeOAuth2Route(),
                new OAuth2TokenRoute(),
                new UserInfoOauth2Route()
            ]
        })
    }
}
