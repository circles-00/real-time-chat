// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-socketio
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BootMixin } from '@loopback/boot'
import { ApplicationConfig } from '@loopback/core'
import { SocketIoApplication } from '@loopback/socketio'
import debugFactory from 'debug'
import { SocketIoController } from './websocket/controllers/sample.controller'
import { USERS_SERVICE } from './domains/users/keys'
import { UserService } from './domains/users/services/user.service'
import { ServiceMixin } from '@loopback/service-proxy'
import { RepositoryMixin } from '@loopback/repository'

const debug = debugFactory('loopback:example:socketio:demo')

export { ApplicationConfig }

export class SocketIoExampleApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(SocketIoApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    this.projectRoot = __dirname
    this.socketServer.bind(USERS_SERVICE).toClass(UserService)

    this.socketServer.use((socket, next) => {
      debug('Global middleware - socket:', socket.id)
      next()
    })

    const ns = this.socketServer.route(SocketIoController)
    ns.use((socket, next) => {
      debug(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      )
      next()
    })
  }
}
