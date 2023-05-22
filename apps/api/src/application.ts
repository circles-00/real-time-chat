import { BootMixin } from '@loopback/boot'
import { ApplicationConfig } from '@loopback/core'
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { CHAT_SERVICE, USERS_SERVICE } from './domains/users/keys'
import { UserService } from './domains/users/services/user.service'
import { ChatService } from './domains/chat/services/chat.service'

export { ApplicationConfig }

export class ApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    this.setupBindings()

    this.sequence(MySequence)

    this.static('/', path.join(__dirname, '../public'))

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    })
    this.component(RestExplorerComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['domains/**/**/controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['domains/**/repositories'],
        extensions: ['.repository.js'],
        nested: true,
      },
    }
  }

  setupBindings(): void {
    this.bind(USERS_SERVICE).toClass(UserService)
    this.bind(CHAT_SERVICE).toClass(ChatService)
  }
}
