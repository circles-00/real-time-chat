import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'
const { DB_HOST, DB_USER, DB_NAME, DB_PORT, DB_PASSWORD } = process.env

const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
}

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'db'
  static readonly defaultConfig = config

  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig)
  }
}
