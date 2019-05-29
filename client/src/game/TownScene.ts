import { Room, Client } from 'colyseus.js'

let players: any = {}

export interface TownSceneInterface {
  room: Room
  client: Client
}

export class TownScene extends Phaser.Scene {
  room: Room
  client: Client

  constructor() {
    super({
      key: 'town',
    })
  }

  init(options: TownSceneInterface) {
    this.client = options.client
    this.room = options.room
  }

  create() {
    console.log('town scene created')
  }

  update() {
    let keyF = this.input.keyboard.addKey('F')

    if (Phaser.Input.Keyboard.JustDown(keyF)) {
      this.room.send({ portal: 'forest' })
      this.scene.remove('town')
      this.scene.start('lobby')
      console.log('F pressed client side')
    }
  }
}
