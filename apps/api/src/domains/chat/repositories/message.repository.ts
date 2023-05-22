import { inject } from '@loopback/core'
import { DefaultCrudRepository } from '@loopback/repository'
import { DbDataSource } from '../../../datasources'
import { Message } from '../models/message.model'

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Message, dataSource)
  }
}
