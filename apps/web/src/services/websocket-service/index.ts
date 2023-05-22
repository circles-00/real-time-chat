import { Socket } from 'socket.io-client'
import { createSocket } from '../../utils'
import { TUser } from '@domain/users'

export class WebSocketService {
  static instance: WebSocketService
  socket: Socket

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  constructor() {
    this.socket = createSocket()
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback)
  }

  off(event: string, callback: (...args: any[]) => void) {
    this.socket.off(event, callback)
  }

  emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args)
  }
}
