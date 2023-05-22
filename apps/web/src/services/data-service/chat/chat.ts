import axios from 'axios'
import { createApiHandler } from '../utils'
import { TChat } from '@domain/chat/types'

export const getChat = createApiHandler(
  async (participants: string[]) => {
    const { data } = await axios.post<TChat>(`/server/chat`, participants)
    return data
  },
  ['get_chat'],
)
