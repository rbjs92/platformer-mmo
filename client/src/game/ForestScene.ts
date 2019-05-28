import { Room, Client } from 'colyseus.js'

let sky: any
let players: any = {}

export interface ForestSceneInterface {
  room: Room
  client: Client
}

export class ForestScene extends Phaser.Scene {
  room: Room
  client: Client

  constructor() {
    super({
      key: 'forest',
    })
  }

  init(options: ForestSceneInterface) {
    // store the data that is passed from main_scene to this instance
    this.client = options.client
    this.room = options.room
  }

  create() {
    console.log('forest scene created')
  }

  update() {
    let keyT = this.input.keyboard.addKey('T')

    if (Phaser.Input.Keyboard.JustDown(keyT)) {
      this.room.send({ portal: 'town' })
      this.scene.remove('forest')
      this.scene.start('lobby')
      console.log('T pressed client side')
    }
  }
}
