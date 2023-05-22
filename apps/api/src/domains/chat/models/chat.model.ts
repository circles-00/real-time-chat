import { Entity, hasMany, model, property } from '@loopback/repository'
import { User } from '../../users/models'
import { Message } from './message.model'
import { UserChat } from './user-chat.model'

@model()
export class Chat extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'date',
    default: () => new Date(),
  })
  timestamp: Date

  @hasMany(() => User, {
    through: { model: () => UserChat, keyFrom: 'chatId', keyTo: 'userId' },
  })
  participants?: User[]

  @hasMany(() => Message, { keyTo: 'chatId' })
  messages?: Message[]
}
