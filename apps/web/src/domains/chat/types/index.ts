import { TUser } from '@domain/users'

export type TMessage = {
  id: number
  message: string
  sentBy: TUser
}

export type TChat = {
  id: number
  timestamp: string
  participants: TUser[]
  messages: TMessage[]
}
