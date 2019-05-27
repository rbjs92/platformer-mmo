import express from 'express'
import auth from './auth'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'api route',
  })
})

router.use('/auth', auth)

export = router
