export type UserStatus = 'online' | 'offline'

export interface IUserDetailsProps {
  name: string
  avatar: string
  status: UserStatus
}
