import { Room } from 'colyseus'

export class GameRoom extends Room {
  onInit() {
    console.log('GameRoom initialized')
  }
  onJoin(client) {
    console.log(client.sessionId, 'joined GameRoom')
  }
  onLeave(client) {
    console.log(client.sessionId, 'left GameRoom')
  }
  onMessage(client, data) {
    // handle player messages
  }
}
