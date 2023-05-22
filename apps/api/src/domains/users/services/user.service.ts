import { DataObject, repository } from '@loopback/repository'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../models'

export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async createUser(user: DataObject<User>) {
    const userFromDb = await this.getUserByEmail(user.email as string)

    if (userFromDb) {
      return userFromDb
    }

    return this.userRepository.create(user)
  }

  async getUsers() {
    return this.userRepository.find()
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async updateUserStatus(email: string, status: string, socketId: string) {
    let userFromDb = await this.getUserByEmail(email)

    if (!userFromDb) {
      userFromDb = await this.userRepository.findOne({
        where: {
          socketId,
        },
      })
    }

    // ^ Doing this, because or filter magically doesn't work, cmon loopback :(

    // TODO: Introduce constructors for models, or find another better way to do this
    if (!userFromDb) return

    userFromDb.status = status
    userFromDb.socketId = socketId

    return this.userRepository.save(userFromDb)
  }
}
