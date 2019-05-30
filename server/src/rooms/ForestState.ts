import { Body, Bodies, World} from 'matter-js'

import { State } from './State'

export class ForestState extends State {
  platforms: any

  createEnvironment() {
    // add world static bodies
    this.platforms = Body.create({
      parts: [
        Bodies.rectangle(0, -64, 1024, 128),
        Bodies.rectangle(0, 320, 1536, 128),
      ],
      isStatic: true,
    })

    // add objects to world
    World.add(this.world, [this.platforms])
  }
}
