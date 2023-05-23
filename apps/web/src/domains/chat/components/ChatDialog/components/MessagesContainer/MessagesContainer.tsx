import { type FC } from 'react'
import { TChat } from '@domain/chat/types'

interface IMessagesContainerProps {
  chat?: TChat
  isMyMessage: (email: string) => boolean
}

export const MessagesContainer: FC<IMessagesContainerProps> = ({
  chat,
  isMyMessage,
}) => {
  return (
    <div className="mt-5 w-full h-96 overflow-y-scroll flex flex-col gap-5 border-2 rounded-md border-slate-700 p-7">
      {chat?.messages?.map((message, idx) =>
        isMyMessage(message?.sentBy?.email) ? (
          <div
            key={idx}
            className="text-white bg-slate-400 w-7/12 rounded-lg py-2 px-4"
          >
            {message?.message}
          </div>
        ) : (
          <div
            key={idx}
            className="text-white ml-auto bg-indigo-600 w-7/12 rounded-lg py-2 px-4"
          >
            {message?.message}
          </div>
        ),
      )}
    </div>
  )
}
