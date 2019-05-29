import { Client } from 'colyseus.js'

import { TownScene } from './TownScene'
import { ForestScene } from './ForestScene'

import UserService from '../services/UserService'

const WS_URL = `ws://localhost:2567`

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'lobby',
    })
  }

  preload() {}

  async init(data) {
    try {
      await this.getToken()
      await this.getPlayerLocation()

      if (this.map === 'town') this.connectTown(this.token, data)
      else if (this.map === 'forest') this.connectForest(this.token, data)
      else throw new Error('map not found')
    } catch (error) {
      throw new Error(error)
    }
  }

  connectTown(token, data) {
    this.client = new Client(WS_URL)
    this.client.onOpen.add(() => {
      console.log('client opened')
      this.room = this.client.join('town-room', { token, create: data.create })
      this.room.onJoin.add(() => {
        console.log('room opened')
        this.scene.add('town', TownScene, true, {
          room: this.room,
          client: this.client,
        })
        this.scene.remove('lobby')
      })
    })
  }

  connectForest(token, data) {
    this.client = new Client(WS_URL)
    this.client.onOpen.add(() => {
      console.log('client opened')
      this.room = this.client.join('forest-room', { token, create: data.create })
      this.room.onJoin.add(() => {
        console.log('room opened')
        this.scene.add('forest', ForestScene, true, {
          room: this.room,
          client: this.client,
        })
        this.scene.remove('lobby')
      })
    })
  }

  async getToken() {
    try {
      const token = await localStorage.getItem('token')
      this.token = token
    } catch (error) {
      throw new Error(error)
    }
  }

  async getPlayerLocation() {
    try {
      const map = (await UserService.profile()).data.location
      this.map = map
    } catch (error) {
      throw new Error(error)
    }
  }
}
