import { Route, RouteMethods } from '../../../base/Route'
import { OAuth2HasScopePermission } from '../../../middlewares/scopesAllowed'
import { checkUserLogged } from '../../../middlewares/userLogged'

export class UsersMeRouteGet extends Route {
    protected method: RouteMethods = 'get'

    constructor () {
        super({
            middlewares: [
                checkUserLogged({
                    allowSSO: true
                })
            ]
        })
    }

    init () {
        this.router.use((req, res) => {
            const hasScopeEmail = OAuth2HasScopePermission(req.jwtPayload, ['email'])

            this.dd.controllers.users.getById(req.jwtPayload.userId, {
                email: hasScopeEmail,
                firstName: true,
                lastName: true,
                id: true,
                avatarUrl: true
            })
                .then(user => {
                    if (user.code === 200) {
                        res.json(user.data)
                    } else {
                        res.status(user.code).json({ message: user.message })
                    }
                })
        })
    }
}
