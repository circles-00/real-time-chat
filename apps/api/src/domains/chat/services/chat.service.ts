import { repository } from '@loopback/repository'
import { ChatRepository } from '../repositories/chat.repository'
import { MessageRepository } from '../repositories/message.repository'
import { UserChatRepository } from '../repositories/user-chat.repository'
import { Chat } from '../models'
import { UserChat } from '../models/user-chat.model'
import { Message } from '../models/message.model'
import { UserRepository } from '../../users/repositories/user.repository'

export class ChatService {
  constructor(
    @repository(ChatRepository)
    private chatRepository: ChatRepository,
    @repository(MessageRepository)
    private messageRepository: MessageRepository,
    @repository(UserChatRepository)
    private userChatRepository: UserChatRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getOrCreateChat(participants: string[]) {
    const chatsFromDb = await this.chatRepository.find({
      include: ['participants', 'messages'],
    })

    const chatFromDb = chatsFromDb.find((chat) =>
      chat.participants?.every((participant) =>
        participants.map((p) => p).includes(participant.email as string),
      ),
    )

    if (chatFromDb) return chatFromDb

    const chat = await this.chatRepository.save(new Chat())

    // TODO: Refactor all models, this is bad
    for (const participant of participants ?? []) {
      const userChat = new UserChat()
      const participantFromDb = await this.userRepository.findOne({
        where: { email: participant },
      })

      userChat.chatId = chat.id
      userChat.userId = participantFromDb?.id
      await this.userChatRepository.save(userChat)
    }

    return chat
  }

  async saveMessage(chatId: number, sentBy: string, message: string) {
    const messageRow = new Message()
    const senderFromDb = await this.userRepository.findOne({
      where: {
        email: sentBy,
      },
    })

    messageRow.chatId = chatId
    messageRow.userId = senderFromDb?.id as number
    messageRow.message = message
    messageRow.timestamp = new Date()

    await this.messageRepository.save(messageRow)
  }

  async getChat(participants: string[]) {
    const chat = await this.getOrCreateChat(participants)

    const mutatedMessages = await Promise.all(
      (chat?.messages ?? []).map(async (message) => {
        const userFromDb = await this.userRepository.findOne({
          where: {
            id: message.userId,
          },
        })

        return {
          ...message,
          sentBy: userFromDb,
        }
      }),
    )

    return {
      ...chat,
      messages: mutatedMessages,
    }
  }
}
