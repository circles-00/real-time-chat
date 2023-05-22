import { api, post, Request, requestBody, RestBindings } from '@loopback/rest'
import { inject } from '@loopback/core'
import { CHAT_SERVICE } from '../../users/keys'
import { ChatService } from '../services/chat.service'

@api({ basePath: '/chat' })
export class ChatController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(CHAT_SERVICE)
    public chatService: ChatService,
  ) {}

  @post('/')
  async getChat(@requestBody() participants: string[]) {
    return await this.chatService.getChat(participants)
  }
}
