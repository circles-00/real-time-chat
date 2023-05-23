import { useUpdate } from '@rounik/react-custom-hooks'
import { useUser } from '@hooks'
import { WebSocketService } from '@services'

export const useWebSocket = () => {
  const { user } = useUser()

  const updateStatus = (status: string) => {
    WebSocketService.getInstance().emit('updateStatus', {
      email: user?.user?.email,
      status: status,
    })
  }

  const onUpdateStatus = (callback: () => void) => {
    WebSocketService.getInstance().on('updateStatus', callback)
  }

  const joinChat = (chatId: number) => {
    WebSocketService.getInstance().emit('joinChat', { chatId })
  }

  const sendMessage = (chatId: number, sender: string, message: string) => {
    WebSocketService.getInstance().emit('sendMessage', {
      chatId,
      sender,
      message,
    })
  }

  const listenForMessages = (callback: () => void) => {
    WebSocketService.getInstance().on('newMessage', callback)
  }

  useUpdate(() => {
    if (!user) return

    WebSocketService.getInstance().on('connect', () => {
      updateStatus('online')
    })

    return () => {
      WebSocketService.getInstance().off('connect', () => null)
    }
  }, [user])

  return {
    updateStatus,
    onUpdateStatus,
    joinChat,
    sendMessage,
    listenOnPrivateRoom: listenForMessages,
  }
}
