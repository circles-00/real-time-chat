import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { DbDataSource } from '../../../datasources'
import { UserChat } from '../models/user-chat.model'

export class UserChatRepository extends DefaultCrudRepository<
  UserChat,
  typeof UserChat.prototype.id,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(UserChat, dataSource)
  }
}
