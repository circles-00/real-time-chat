import {
  belongsTo,
  Entity,
  hasOne,
  model,
  property,
} from '@loopback/repository'
import { User } from '../../users/models'
import { Chat } from './chat.model'

@model()
export class Message extends Entity {
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

  @property({
    type: 'string',
  })
  message: string

  @belongsTo(() => Chat, { name: 'chat' })
  chatId: number

  @belongsTo(() => User, { name: 'user' })
  userId: number
}
