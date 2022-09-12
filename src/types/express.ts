/* eslint-disable no-unused-vars */
import { JwtPayload } from './jwt-payload'

declare module 'express-serve-static-core' {
    interface Request {
      jwtPayload: JwtPayload
    }
  }
