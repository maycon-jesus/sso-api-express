export type JwtPayload = {
    userId: number,
    oauth2?: boolean,
    scopes?: string[]
}
