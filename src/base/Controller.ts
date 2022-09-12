import { getDependencysOfContext } from '../libs/DependencysManager'
import { IControllerDependencys } from '../types/global-dependencys'

export abstract class Controller {
    protected dd:IControllerDependencys

    constructor () {
        this.dd = getDependencysOfContext('controller')
    }
}
