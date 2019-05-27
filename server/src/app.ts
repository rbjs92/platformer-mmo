import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

require('dotenv').config()

const middlewares = require('./middlewares')
const api = require('./api')

const app = express()

app.use(morgan('dev'))
app.use(helmet())

app.use('/api', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export = app
