import { State } from './State'

export class TownState extends State {
  platforms: any

  createEnvironment() {}

  onUpdate() {
    console.log('this is town state')
  }
}
