import { ApplicationsController } from './../controllers/Applications'
import { UsersController } from './../controllers/Users'
import { AuthController } from '../controllers/Auth'
import { RegisterController } from '../controllers/Register'
import { AuthorizationsController } from '../controllers/Authorizations'

export class Controllers {
    register:RegisterController
    auth: AuthController
    users: UsersController
    applications: ApplicationsController
    authorizations:AuthorizationsController

    constructor () {
        this.register = new RegisterController()
        this.auth = new AuthController()
        this.users = new UsersController()
        this.applications = new ApplicationsController()
        this.authorizations = new AuthorizationsController()
    }
}
