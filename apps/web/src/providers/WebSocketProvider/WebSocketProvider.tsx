import { createContext, type FC, type ReactNode, useContext } from 'react'
import { useWebSocket } from '@hooks'

interface IWebSocketProviderProps {
  children: ReactNode
}

type TWebSocketContext = ReturnType<typeof useWebSocket>

const WebSocketContext = createContext<TWebSocketContext | null>(null)

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider',
    )
  }

  return context
}

export const WebSocketProvider: FC<IWebSocketProviderProps> = ({
  children,
}) => {
  const socket = useWebSocket()

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
}
