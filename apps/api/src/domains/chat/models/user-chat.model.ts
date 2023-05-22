import { Entity, model, property } from '@loopback/repository'

@model()
export class UserChat extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'number',
  })
  userId?: number

  @property({
    type: 'number',
  })
  chatId?: number
}
