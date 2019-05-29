import { Room, Client } from 'colyseus'
import { Schema, MapSchema, type } from '@colyseus/schema'
import jwt from 'jsonwebtoken'

import User from '../models/User'

class Player extends Schema {
  @type('number') x: number
  @type('number') y: number
}

class TownState extends Schema {
  @type({ map: Player })
  players = new MapSchema()

  onUpdate() {
    console.log('this is town state')
  }
}

class ForestState extends Schema {
  @type({ map: Player })
  players = new MapSchema()

  onUpdate() {
    console.log('this is forest state')
  }
}

export class GameRoom extends Room {

  maxClients = 4

  onInit(options: any) {
    console.log('onInit', options)

    if (options.map === 'town') this.setState(new TownState())
    if (options.map === 'forest') this.setState(new ForestState())
  }

  requestJoin(options: any, isNew: boolean) {
    return options.create ? isNew : true
  }

  async onAuth(options: any) {
    try {
      const user = await jwt.verify(options.token, process.env.JWT_SECRET || 'secret')
      return user
    } catch (error) {
      return false
    }
  }

  onJoin(client: Client, options: any, auth: any) {
    // console.log('onJoin', client.sessionId, auth)
    this.state.onUpdate()
  }

  onLeave(client: Client) {
    // console.log('onLeave', client.sessionId)
  }

  onMessage(client: Client, data: any) {
    if (data.portal) this.onPortal(client, data)
  }

  async onPortal(client: Client, data: any) {
    try {
      await User.findOneAndUpdate({ email: client.auth.email }, { $set: { location: data.portal } }, { new: true })
      client.close()
    } catch (error) {
      throw new Error(error)
    }
  }
}
