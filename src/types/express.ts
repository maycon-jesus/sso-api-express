/* eslint-disable no-unused-vars */
import { JwtPayload } from './jwt-payload'

declare global {
  namespace Express {
    interface Request {
      jwtPayload: JwtPayload
    }
  }

}
