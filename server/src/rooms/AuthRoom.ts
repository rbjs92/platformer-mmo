import { Room} from 'colyseus'
import jwt from 'jsonwebtoken'

export class AuthRoom extends Room {
  async onAuth(options: any) {
    try {
      const userData = await jwt.verify(options.token, process.env.JWT_SECRET || 'secret')
      return userData
    } catch (error) {
      const dbPlayer = {
        location: 'forest'
      }
      return dbPlayer
      // return false
    }
  }
  onMessage(client: any, data: any) {
    //
  }
}
