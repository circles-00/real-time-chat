import { Getter, inject } from '@loopback/core'
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasManyThroughRepositoryFactory,
  repository,
} from '@loopback/repository'
import { DbDataSource } from '../../../datasources'
import { Chat } from '../models'
import { Message } from '../models/message.model'
import { MessageRepository } from './message.repository'
import { UserRepository } from '../../users/repositories/user.repository'
import { UserChatRepository } from './user-chat.repository'
import { User } from '../../users/models'
import { UserChat } from '../models/user-chat.model'

export class ChatRepository extends DefaultCrudRepository<
  Chat,
  typeof Chat.prototype.id,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
> {
  messages: HasManyRepositoryFactory<Message, typeof Chat.prototype.id>
  public readonly participants: HasManyThroughRepositoryFactory<
    User,
    typeof User.prototype.id,
    UserChat,
    typeof Chat.prototype.id
  >

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MessageRepository')
    messageRepositoryGetter: Getter<MessageRepository>,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('UserChatRepository')
    userChatRepositoryGetter: Getter<UserChatRepository>,
  ) {
    super(Chat, dataSource)

    this.messages = this.createHasManyRepositoryFactoryFor(
      'messages',
      messageRepositoryGetter,
    )

    this.registerInclusionResolver('messages', this.messages.inclusionResolver)

    this.participants = this.createHasManyThroughRepositoryFactoryFor(
      'participants',
      userRepositoryGetter,
      userChatRepositoryGetter,
    )

    this.registerInclusionResolver(
      'participants',
      this.participants.inclusionResolver,
    )
  }
}
