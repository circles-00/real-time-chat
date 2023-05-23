import { type FC } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

interface IChatDialogFooterProps {
  message: string
  setMessage: (message: string) => void
  onHandleSendMessage: () => void
}

export const ChatDialogFooter: FC<IChatDialogFooterProps> = ({
  onHandleSendMessage,
  setMessage,
  message,
}) => {
  return (
    <div className="mt-4 flex">
      <input
        onChange={(event) => setMessage(event.target.value)}
        value={message}
        placeholder="Write a message..."
        className="border-2 rounded-md px-2 w-full mr-4 border-slate-700"
      />
      <button
        type="button"
        className="inline-flex items-center gap-1 ml-auto justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={onHandleSendMessage}
      >
        Send
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </div>
  )
}
