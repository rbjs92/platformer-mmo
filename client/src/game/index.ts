import * as Phaser from 'phaser'
import { Room, Client } from 'colyseus.js'

import { TownScene } from './TownScene'
import { ForestScene } from './ForestScene'

import UserService from '../services/UserService'

class LobbyScene extends Phaser.Scene {
  room: Room
  client: Client
  token: string
  map: string

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

  constructor() {
    super({
      key: 'lobby',
    })
  }

  async init() {
    await this.getToken()
    await this.getPlayerLocation()

    if (this.map === 'town') this.connectTown(this.token)
    else if (this.map === 'forest') this.connectForest(this.token)
    else throw new Error('map not found')
  }

  connectTown(token: string) {
    this.client = new Client('ws://localhost:2567')
    this.client.onOpen.add(() => {
      console.log('client opened')
      this.room = this.client.join('town-room', { token })
      this.room.onJoin.add(() => {
        console.log('room opened')
        this.scene.stop('lobby')
        this.scene.add('town', TownScene, true, {
          room: this.room,
          client: this.client,
        })
      })
    })
  }

  connectForest(token: string) {
    this.client = new Client('ws://localhost:2567')
    this.client.onOpen.add(() => {
      console.log('client opened')
      this.room = this.client.join('forest-room', { token })
      this.room.onJoin.add(() => {
        console.log('room opened')
        this.scene.stop('lobby')
        this.scene.add('forest', ForestScene, true, {
          room: this.room,
          client: this.client,
        })
      })
    })
  }
}

const config = {
  type: Phaser.AUTO,
  // backgroundColor: '0xFFFFFF',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'game-container',
  scene: LobbyScene,
}

export function connect() {
  new Phaser.Game(config)
}