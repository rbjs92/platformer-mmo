import * as Phaser from 'phaser'

import { LobbyScene } from './LobbyScene'

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '0xA0CED9',
  parent: 'game-container',
  scene: LobbyScene,
}

export function connect() {
  new Phaser.Game(config)
}