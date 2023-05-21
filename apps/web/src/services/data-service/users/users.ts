import { createApiHandler } from '../utils'
import axios from 'axios'

export const getUsers = createApiHandler(async () => {
  const { data } = await axios.get<any[]>('/server/users')
  return data
}, ['get_users'])

export const createUser = createApiHandler(
  async (payload: unknown) => {
    await axios.post('/server/users', payload)
  },
  ['create_user'],
)
