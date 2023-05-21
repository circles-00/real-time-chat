// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-socketio
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Socket, socketio } from '@loopback/socketio'
import debugFactory from 'debug'
import { inject } from '@loopback/core'
import { USERS_SERVICE } from '../../domains/users/keys'
import { UserService } from '../../domains/users/services/user.service'
import { User } from '../../domains/users/models'
import { UserRepository } from '../../domains/users/repositories/user.repository'
import { DbDataSource } from '../../datasources'

const debug = debugFactory('loopback:socketio:controller')

/**
 * A demo controller for socket.io
 *
 * ```ts
 * @socketio('/')
 * ```
 * This specifies the namespace / for this controller
 * Regex or strings are acceptable values for namespace
 */
@socketio('/')
export class SocketIoController {
  userService: UserService
  constructor(
    @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
  ) {
    this.userService = new UserService(new UserRepository(new DbDataSource()))
  }

  /**
   * The method is invoked when a client connects to the server
   *
   * @param socket - The socket object for client
   */
  @socketio.connect()
  async connect(socket: Socket) {
    console.log('Client connected: %s', this.socket.id)
  }

  @socketio.subscribe('updateStatus')
  async updateStatus(data: any) {
    await this.userService.updateUserStatus(data.email, data.status)
  }

  /**
   * Register a handler for 'subscribe-to-channel' events
   *
   * @param msg - The message sent by client
   */
  @socketio.subscribe('subscribe-to-channel')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  async registerChannel(msg: string[]) {
    debug('Subscribe to channel: %s', msg)
    if (Array.isArray(msg) && msg.length > 0) {
      for (const item of msg) await this.socket.join(item)
    } else {
      throw new Error('Channels data not appropriate')
    }
  }

  /**
   * Register a handler for 'general-message-forward' events
   *
   * @param msg - The message sent by client
   */
  @socketio.subscribe('general-message-forward')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  handleChatMessage(msg: unknown) {
    debug('General forwarded message: %s', msg)
    this.socket.nsp.emit('general-message-forward', msg)
  }

  /**
   * Register a handler for 'general-message' events
   *
   * @param msg - The message sent by client
   */
  @socketio.subscribe('general-message')
  // @socketio.emit('namespace' | 'requestor' | 'broadcast')
  handleGeneralMessage(msg: string) {
    debug('General Message : %s', msg)
    const parsedMsg: {
      subject: string
      body: string
      receiver: {
        to: {
          id: string
          name?: string
        }[]
      }
      type: string
      sentDate: Date
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any
    } = JSON.parse(msg)

    if (parsedMsg?.receiver?.to?.length > 0) {
      parsedMsg.receiver.to.forEach((item) =>
        this.socket.nsp.to(item.id).emit('message', {
          subject: parsedMsg.subject,
          body: parsedMsg.body,
          options: parsedMsg.options,
        }),
      )
    } else {
      throw new Error('Inappropriate message data')
    }
  }

  /**
   * Register a handler for all events
   */
  @socketio.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    debug('Message: %s', args)
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @socketio.disconnect()
  disconnect() {
    debug('Client disconnected: %s', this.socket.id)
  }
}
