const { Server } = require('socket.io')

export class WebsocketServer {
  io: any

  constructor() {
    this.io = new Server(3300, {
      cors: {
        origin: '*',
      },
    })
  }

  async start() {
    this.io.on('connection', (socket: any) => {
      socket.on('disconnect', () => {})
      socket.on('updateStatus', (data: any) => {
        console.log('updateStatus', data)
      })
    })
  }

  async stop() {
    this.io.close()
  }
}
