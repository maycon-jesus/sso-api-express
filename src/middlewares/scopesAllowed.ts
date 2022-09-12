import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from '../types/jwt-payload'

export function OAuth2HasScopePermission (tokenPayload: JwtPayload, scopes: string[]) {
    if (!tokenPayload.oauth2) return true
    if (!tokenPayload.scopes) return false
    const hasAllScopes = scopes.every(scope => tokenPayload.scopes?.includes(scope))
    if (!hasAllScopes) return false
    return true
}

export function scopesAllowedMiddleware (scopes:string[]) {
    return (req:Request, res:Response, next: NextFunction) => {
        if (!req.jwtPayload.oauth2) return next()
        if (!req.jwtPayload.scopes) return res.status(401).json({ message: 'Credencial de acesso inválida!' })

        if (OAuth2HasScopePermission(req.jwtPayload, scopes)) return next()
        res.status(403).json({ message: 'Scopes missing' })
    }
}
