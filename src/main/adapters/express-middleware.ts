import { Middleware } from '@/presentation/contracts/middleware'
import { RequestHandler } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adaptExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([_, value]) => value)
    req.locals = { ...req.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
