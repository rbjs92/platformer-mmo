import { LobbyScene } from './LobbyScene'

let keyN
let keyF

export class TownScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'town',
    })
  }

  init(options) {
    this.client = options.client
    this.room = options.room
  }

  create() {
    keyN = this.input.keyboard.addKey('N')
    keyF = this.input.keyboard.addKey('F')

    this.add.rectangle(700, 400, 400, 70, 0x40685f)
    this.add.rectangle(400, 610, 5000, 70, 0x40685f)
    this.add.rectangle(300, 450, 70, 70, 0x40685f)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyF)) this.travelToForest()
    if (Phaser.Input.Keyboard.JustDown(keyN)) this.createNewRoom()
  }

  travelToForest() {
    this.room.send({ portal: 'forest' })
    this.scene.add('lobby', LobbyScene, true)
    this.scene.remove('town')
  }

  createNewRoom() {
    this.room.send({ portal: 'town' })
    this.scene.add('lobby', LobbyScene, true, { create: true })
    this.scene.remove('town')
  }
}
