import { Room, Client } from 'colyseus'
import { Schema, MapSchema, type } from '@colyseus/schema'
import jwt from 'jsonwebtoken'

import { Engine } from 'matter-js'

import User from '../models/User'

import { TownState } from './TownState'
import { ForestState } from './ForestState'

export class GameRoom extends Room {
  maxClients = 4

  onInit(options: any) {
    if (options.map === 'town') this.setState(new TownState())
    if (options.map === 'forest') this.setState(new ForestState())

    this.setPatchRate(1000 / 60) // 60/s update from server to clients
    this.setSimulationInterval(() => this.startEngine()) // start engine and game loop

    this.state.createWorld()
    this.state.createEnvironment()
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
    console.log('onJoin', client.sessionId)
    this.state.createPlayer(client.sessionId)
  }

  onLeave(client: Client) {
    console.log('onLeave', client.sessionId)
    this.state.removePlayer(client.sessionId)
  }

  onMessage(client: Client, data: any) {
    if (data.action) this.state.handlePlayerInput(client.sessionId, data.action)
    if (data.portal) this.onPortal(client, data)
  }

  startEngine() {
    Engine.update(this.state.engine, 1000 / 60)
    this.state.onUpdate()
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
