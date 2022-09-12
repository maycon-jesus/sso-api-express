import cors from 'cors'

export const corsMiddleware = cors({
    origin (requestOrigin, callback) {
        if (!requestOrigin || ['mayconjesus.dev', 'localhost'].some(str => requestOrigin?.includes(str))) {
            callback(null, true)
        } else {
            callback(new Error('CORS BLOCKED'))
        }
    }
})
