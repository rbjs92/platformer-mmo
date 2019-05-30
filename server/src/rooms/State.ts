import Matter from 'matter-js'
import { Schema, type, MapSchema } from '@colyseus/schema'

import { Player } from './Player'

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()

  engine: Matter.Engine
  world: any

  createWorld() {
    // world settings
    this.engine = Matter.Engine.create()
    this.world = this.engine.world
    this.world.gravity.y = 1
  }

  createPlayer(id: string) {
    // create player state
    this.players[id] = new Player()

    // add player body to the world
    Matter.World.add(this.world, this.players[id].body)
  }

  removePlayer(id: string) {
    // delete player body
    Matter.Composite.remove(this.world, this.players[id].body)

    // delete player state
    delete this.players[id]
  }

  handlePlayerInput(id, action) {
    if (action === 'keyLeftDown') this.players[id].onMoveLeft = true
    else if (action === 'keyLeftUp') this.players[id].onMoveLeft = false

    if (action === 'keyRightDown') this.players[id].onMoveRight = true
    else if (action === 'keyRightUp') this.players[id].onMoveRight = false

    if (action === 'keyUpDown') this.players[id].onJump = true
    else if (action === 'keyUpUp') this.players[id].onJump = false
  }

  onUpdate() {
    // loop thru players and check for changes in the state
    for (const id in this.players) {
      this.players[id].handlePlayerLogic()
    }
  }
}
