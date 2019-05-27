import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

require('dotenv').config()

import database from './database'
import middlewares from './middlewares'

database.init()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

require('./routes')(app)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export = app
