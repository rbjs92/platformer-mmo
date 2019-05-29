import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'

require('dotenv').config()

import middlewares from './middlewares'
import database from './database'
import { GameRoom } from './rooms/GameRoom'

// initialize database
database.init()

// create express app
const app = express()

// middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

// custom routes
require('./routes')(app)

// merge servers
const gameServer = new Server({
  server: createServer(app),
})

// gamerooms
gameServer.register('town-room', GameRoom, { map: 'town' })
gameServer.register('forest-room', GameRoom, { map: 'forest' })
gameServer.register('fields-room', GameRoom, { map: 'fields' })

// gameserver webmonitor
app.use('/colyseus', monitor(gameServer))

// custom middleware
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = Number(process.env.PORT || 2567)
gameServer.onShutdown(() => console.log('GameServer shutting down!'))
gameServer.listen(port)
console.log(`Listening: http://localhost:${port}`)
