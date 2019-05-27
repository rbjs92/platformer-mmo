import { Request, Response } from 'express'

import Joi from '@hapi/joi'

export = {
  register(req: Request, res: Response, next: any) {
    const schema = {
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
    }
    const result = Joi.validate(req.body, schema)
    if (result.error === null) {
      next()
    } else {
      switch (result.error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'You must provide a valid username',
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email',
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password should be atleast 6 characters long',
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid request, sorry',
          })
      }
    }
  },
}
