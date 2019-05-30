import { Schema, type } from '@colyseus/schema'

import Matter, { Bodies, Body } from 'matter-js'
import { MatterCollisionEvents } from 'matter-collision-events'
Matter.use(MatterCollisionEvents)

export class Player extends Schema {
  @type('number')
  x: number = 150
  @type('number')
  y: number = -450
  @type('string')
  animation: string = 'idle'

  body: Body = this.createPlayerBody()
  isTouching: any = { left: false, right: false, ground: false }
  onMoveLeft: boolean = false
  onMoveRight: boolean = false
  onJump: boolean = false

  createPlayerBody() {
    const sensorW = 3
    const bodyW = 68
    const bodyH = 134

    const mainBody = Bodies.rectangle(this.x, this.y, bodyW, bodyH, { chamfer: { radius: 55 } })

    const sensors = {
      left: Bodies.rectangle(this.x - bodyW * 0.5, this.y, sensorW, bodyH * 0.8, {
        isSensor: true,
      }),
      right: Bodies.rectangle(this.x + bodyW * 0.5, this.y, sensorW, bodyH * 0.8, {
        isSensor: true,
      }),
      ground: Bodies.rectangle(this.x, this.y + bodyH * 0.5, bodyW * 0.75, sensorW, { isSensor: true }),
    }

    sensors.left.onCollide(() => (this.isTouching.left = true))
    sensors.left.onCollideEnd(() => (this.isTouching.left = false))

    sensors.right.onCollide(() => (this.isTouching.right = true))
    sensors.right.onCollideEnd(() => (this.isTouching.right = false))

    sensors.ground.onCollide(() => (this.isTouching.ground = true))
    sensors.ground.onCollideEnd(() => (this.isTouching.ground = false))

    return Body.create({
      parts: [mainBody, sensors.right, sensors.ground, sensors.left],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1,
      inertia: Infinity,
    })
  }

  handlePlayerLogic() {
    const moveForce = this.isTouching.ground ? 0.02 : 0.0015
    const jumpForce = 25

    if (this.onMoveLeft === true) {
      this.animation = 'moveLeft'
      Body.applyForce(this.body, { x: this.body.position.x, y: this.body.position.y }, { x: -moveForce, y: 0 })
    } else if (this.onMoveRight === true) {
      this.animation = 'moveRight'
      Body.applyForce(this.body, { x: this.body.position.x, y: this.body.position.y }, { x: moveForce, y: 0 })
    }

    // limit player speed
    if (this.body.velocity.x > 7) Body.setVelocity(this.body, { x: 7, y: this.body.velocity.y })
    else if (this.body.velocity.x < -7) Body.setVelocity(this.body, { x: -7, y: this.body.velocity.y })

    // jump if player is on the ground
    if (this.onJump === true && this.isTouching.ground)
      Body.setVelocity(this.body, { x: this.body.velocity.x, y: -jumpForce })

    // if no input then set sprite in neutral state
    if (this.onMoveLeft === false && this.onMoveRight === false && this.onJump === false) this.animation = 'idle'

    // if player touches left or right and is in air then remove friction (spiderman)
    if ((this.isTouching.left || this.isTouching.right) && !this.isTouching.ground)
      Body.set(this.body, 'friction', 0)
    else Body.set(this.body, 'friction', 0.1)

    //
    // update state with player position
    //
    this.x = this.body.position.x
    this.y = this.body.position.y
  }
}
