import { Route, RouteMethods } from '../../base/Route'
import { OAuth2HasScopePermission, scopesAllowedMiddleware } from '../../middlewares/scopesAllowed'
import { checkUserLogged } from '../../middlewares/userLogged'

export class UserInfoOauth2Route extends Route {
    protected path: string = '/userinfo'
    protected method: RouteMethods = 'get'

    constructor () {
        super({
            middlewares: [
                checkUserLogged({ allowSSO: true }),
                scopesAllowedMiddleware(['basic'])
            ]
        })
    }

    init (): void {
        this.router.use('/', (req, res) => {
            const hasEmailScope = OAuth2HasScopePermission(req.jwtPayload, ['email'])

            this.dd.controllers.users.getById(req.jwtPayload.userId, {
                email: hasEmailScope,
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
