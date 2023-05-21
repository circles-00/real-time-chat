import { Entity, model, property } from '@loopback/repository'

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'string',
    required: true,
  })
  name: string

  @property({
    type: 'string',
    required: true,
  })
  email: string

  @property({
    type: 'string',
    required: true,
  })
  github_id: string

  @property({
    type: 'string',
    required: true,
  })
  avatar: string

  constructor(data?: Partial<User>) {
    super(data)
  }
}
