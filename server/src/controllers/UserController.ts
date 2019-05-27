import { Response } from 'express'
import { RequestInterface } from '../interfaces/RequestInterface'

import User from '../models/User'

export = {
  async profile(req: RequestInterface, res: Response) {
    try {
      const { email } = req.user
      const user = await User.findOne({ email })
      
      res.send({
        username: user.username,
        location: user.location,
      })
    } catch (err) {
      res.status(500).send({ error: 'This is probably a server problem' })
    }
  },
}
