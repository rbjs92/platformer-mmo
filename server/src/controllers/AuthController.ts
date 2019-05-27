import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import User from '../models/User'

const jwtSignUser = (user: any) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' },
  )
}

export = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body
      const emailResult = await User.findOne({ email })
      const usernameResult = await User.findOne({ username })

      if (emailResult) {
        return res.status(418).send({ error: 'The email is already in use' })
      }
      if (usernameResult) {
        return res.status(400).send({ error: 'The username is already in use' })
      }

      const newUser = new User()
      newUser.email = email
      newUser.password = await newUser.hashPassword(password)
      newUser.username = username
      newUser.save()

      const token = await jwtSignUser(newUser)

      res.send({
        user: {
          id: newUser.id,
          email: newUser.email,
        },
        token,
      })
    } catch (err) {
      res.status(500).send({ error: 'This may be a server problem, sorry' })
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      const isPasswordValid = await user.comparePassword(password)

      if (!isPasswordValid) {
        return res.status(401).send({ error: 'Please try again' })
      }

      const token = await jwtSignUser(user)

      res.send({
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      })
    } catch (error) {
      res.status(401).send({ error: 'Please try again' })
    }
  },
}
