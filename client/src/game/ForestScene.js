import { LobbyScene } from './LobbyScene'

let keyN
let keyT

export class ForestScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'forest',
      physics: { default: 'matter' },
    })
  }

  init(options) {
    this.client = options.client
    this.room = options.room
  }

  create() {
    keyN = this.input.keyboard.addKey('N')
    keyT = this.input.keyboard.addKey('T')

    this.add.rectangle(400, 400, 400, 70, 0x40685f)
    this.add.rectangle(400, 610, 5000, 70, 0x40685f)
    this.add.rectangle(200, 150, 70, 70, 0x40685f)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyT)) this.travelToTown()
    if (Phaser.Input.Keyboard.JustDown(keyN)) this.createNewRoom()
  }

  travelToTown() {
    this.room.send({ portal: 'town' })
    this.scene.add('lobby', LobbyScene, true)
    this.scene.remove('forest')
  }

  createNewRoom() {
    this.room.send({ portal: 'forest' })
    this.scene.add('lobby', LobbyScene, true, { create: true })
    this.scene.remove('forest')
  }
}
