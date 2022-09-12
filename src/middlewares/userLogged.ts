import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types/jwt-payload'

export function checkUserLogged (opts:{
    allowSSO?: Boolean
} = {}) {
    return (req:Request, res:Response, next: NextFunction) => {
        if (!req.headers.authorization) return res.status(401).json({ message: 'Informe o header "Authorization"' })
        try {
            const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET!, {
                audience: opts.allowSSO ? undefined : 'Maycon Jesus Clients'
            }) as JwtPayload
            req.jwtPayload = payload
            next()
        } catch {
            res.status(401).json({ message: 'Token de autorização inválido. Faça login novamente!' })
        }
    }
}
