import { type FC, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { TUser } from '@domain/users'
import { useQuery } from '@tanstack/react-query'
import { DataService } from '@services'
import { useUser } from '@hooks'
import { useUpdate } from '@rounik/react-custom-hooks'
import { useWebSocketContext } from '@providers'
import {
  MessagesContainer,
  ChatDiallogHeader,
  ChatDialogFooter,
} from './components'

interface IChatDialogProps extends TUser {
  open: boolean
  onClose: () => void
}

export const ChatDialog: FC<IChatDialogProps> = ({
  open,
  onClose,
  status,
  name,
  avatar,
  email,
}) => {
  // TODO: Use RHF for handling form state
  const [message, setMessage] = useState('')

  const { user } = useUser()
  const { joinChat, sendMessage, listenForMessages } = useWebSocketContext()
  const { data: chat, refetch } = useQuery(
    [DataService.getChat.queryKey, email],
    () => DataService.getChat([user?.user?.email as string, email]),
    { enabled: !!user?.user?.email && !!email },
  )

  useUpdate(() => {
    if (chat) {
      joinChat(chat?.id)
      listenForMessages(refetch)
    }
  }, [chat])

  const isMyMessage = (email: string) => user?.user?.email === email

  const onHandleSendMessage = () => {
    if (!message) return

    sendMessage(chat?.id as number, user?.user?.email as string, message)
    setMessage('')
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ChatDiallogHeader
                    name={name}
                    status={status}
                    avatar={avatar}
                    email={email}
                  />
                  <MessagesContainer chat={chat} isMyMessage={isMyMessage} />
                  <ChatDialogFooter
                    message={message}
                    onHandleSendMessage={onHandleSendMessage}
                    setMessage={setMessage}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
