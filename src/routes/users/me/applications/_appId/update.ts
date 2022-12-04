import { Route, RouteMethods } from '../../../../../base/Route'
import joi from 'joi'

export class ApplicationUpdateRoute extends Route {
    protected method: RouteMethods = 'post'

    private _bodyValidator = joi.object<{
        name: string
    }>({
        name: joi.string().required()
    })

    init (): void {
        this.router.use<{
            appId: string
        }>('/', async (req, res) => {
            const validate = this._bodyValidator.validate(req.body)
            if (validate.error) return res.status(400).json({ message: validate.error })

            await this.dd.controllers.applications.update({
                where: {
                    id: Number(req.params.appId)
                },
                data: validate.value
            })

            res.json({ success: true })
        })
    }
}
