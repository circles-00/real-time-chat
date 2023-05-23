// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-socketio
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Socket, socketio } from '@loopback/socketio'
import debugFactory from 'debug'
import { UserService } from '../../domains/users/services/user.service'
import { UserRepository } from '../../domains/users/repositories/user.repository'
import { DbDataSource } from '../../datasources'
import { ChatService } from '../../domains/chat/services/chat.service'
import { ChatRepository } from '../../domains/chat/repositories/chat.repository'
import { Getter } from '@loopback/core'
import { MessageRepository } from '../../domains/chat/repositories/message.repository'
import { UserChatRepository } from '../../domains/chat/repositories/user-chat.repository'

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
  chatService: ChatService
  messageRepository: MessageRepository
  userRepository: UserRepository
  userChatRepository: UserChatRepository

  private readonly publicRoom = 'publicRoom'
  constructor(
    @socketio.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket,
  ) {
    // TODO: Find a way to inject services into the WebSocket Server, for now enjoy this hack :)
    this.userRepository = new UserRepository(new DbDataSource())
    this.userService = new UserService(this.userRepository)
    this.messageRepository = new MessageRepository(new DbDataSource())
    this.userChatRepository = new UserChatRepository(new DbDataSource())
    this.chatService = new ChatService(
      new ChatRepository(
        new DbDataSource(),
        Getter.fromValue(new MessageRepository(new DbDataSource())),
        Getter.fromValue(this.userRepository),
        Getter.fromValue(this.userChatRepository),
      ),
      this.messageRepository,
      this.userChatRepository,
      this.userRepository,
    )
  }

  /**
   * The method is invoked when a client connects to the server
   *
   * @param socket - The socket object for client
   */
  @socketio.connect()
  async connect(socket: Socket) {
    console.log('Client connected: %s', this.socket.id)
    return socket.join(this.publicRoom)
  }

  @socketio.subscribe('updateStatus')
  // TODO: Add type definitions
  async updateStatus(data: any) {
    try {
      await this.userService.updateUserStatus(
        data.email,
        data.status,
        this.socket.id,
      )
    } catch (error) {
      console.error(error)
    }

    this.socket.nsp
      .to(this.publicRoom)
      .emit('updateStatus', `update:${this.socket.id}`)
  }

  generateRoomName = (chatId: number) => {
    // Abstract to function, just in case we need to implement some generation logic here
    return `${chatId}`
  }

  @socketio.subscribe('joinChat')
  // TODO: Add type definitions
  async joinChat(data: any) {
    this.socket.join(this.generateRoomName(data?.chatId))
  }

  @socketio.subscribe('sendMessage')
  // TODO: Add type definitions
  async sendMessage(data: any) {
    try {
      console.log(data)
      await this.chatService.saveMessage(data.chatId, data.sender, data.message)
      this.socket.nsp
        .to(this.generateRoomName(data.chatId))
        .emit('newMessage', 'new message')
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @socketio.disconnect()
  async disconnect() {
    console.log('Client disconnected: %s', this.socket.id)
    await this.userService.updateUserStatus('', 'offline', this.socket.id)
    this.socket.nsp.to(this.publicRoom).emit('updateStatus', this.socket.id)
  }
}
