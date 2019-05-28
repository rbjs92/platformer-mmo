import { Request, Response } from 'express'
import { RequestInterface } from './interfaces/RequestInterface'
import jwt from 'jsonwebtoken'

export = {
  async onTokenSetUser(req: RequestInterface, res: Response, next: any) {
    try {
      const token = await req.get('authorization').split(' ')[1]
      if (token) {
        const user = await jwt.verify(token, process.env.JWT_SECRET || 'secret')
        req.user = user
        next()
      }
    } catch (err) {
      next()
    }
  },

  isLoggedIn(req: RequestInterface, res: Response, next: any) {
    if (req.user) {
      next()
    } else {
      res.status(401).json({ error: 'Sorry, you are not allowed' })
    }
  },

  notFound(req: Request, res: Response, next: any) {
    res.status(404)
    const error = new Error(`Not Found - ${req.originalUrl}`)
    next(error)
  },

  errorHandler(err: any, req: Request, res: Response) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? 'Please change to dev mode to trace the error.' : err.stack,
    })
  },
}
