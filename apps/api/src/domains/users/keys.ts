import { BindingKey } from '@loopback/core'
import { UserService } from './services/user.service'
import { ChatService } from '../chat/services/chat.service'

export const USERS_SERVICE = BindingKey.create<UserService>('service.user')
export const CHAT_SERVICE = BindingKey.create<ChatService>('service.chat')
