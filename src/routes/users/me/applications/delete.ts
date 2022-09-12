import { Route, RouteMethods } from '../../../../base/Route'

export default class ApplicationsDeleteRoute extends Route {
    protected path: string = '/:appId'
    protected method: RouteMethods = 'delete'

    init () {
        this.router.use<{appId: string}>('/', (req, res) => {
            this.dd.controllers.applications.delete(Number(req.params.appId))
                .then((deleteData) => {
                    if (deleteData.code === 200) {
                        res.json(deleteData.data)
                    } else {
                        res.status(deleteData.code).json({ message: deleteData.message })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 1C3V12VT]' })
                })
        })
    }
}
