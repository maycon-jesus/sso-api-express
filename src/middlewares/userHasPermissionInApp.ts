import { IMiddlewareDependencys } from './../types/global-dependencys'
import { NextFunction, Request, Response } from 'express'
import { getDependencysOfContext } from '../libs/DependencysManager'

export function userHasPermissionInApp () {
    const dd: IMiddlewareDependencys = getDependencysOfContext('middleware')
    return (req:Request<{appId: string}>, res:Response, next: NextFunction) => {
        dd.controllers.applications.userHasPermission(req.jwtPayload.userId, Number(req.params.appId))
            .then((hasPermission) => {
                if (hasPermission.code === 200) {
                    if (hasPermission.data.hasPermission) {
                        next()
                    } else {
                        res.status(404).json({ message: 'Aplicativo não encontrado' })
                    }
                } else {
                    res.status(hasPermission.code).json({ message: hasPermission.message })
                }
            })
            .catch((err) => {
                console.error(err)
                res.status(500).json({ message: 'Ocorreu um erro interno! [ERRO: 2508SJEM]' })
            })
    }
}
