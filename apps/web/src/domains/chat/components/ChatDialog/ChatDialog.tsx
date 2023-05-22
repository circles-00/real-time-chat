import { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { TUser } from '@domain/users'
import Image from 'next/image'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { getChat } from '../../../../services/data-service/chat'
import { useUser } from '@hooks'

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
  const { user } = useUser()

  const { data: chat } = useQuery([getChat.queryKey, email], () =>
    getChat([user?.user?.email as string, email]),
  )

  const isMyMessage = (email: string) => user?.user?.email === email

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
                  <div className="flex items-center gap-4">
                    <Image
                      src={avatar}
                      alt={'User Avatar'}
                      width={50}
                      height={50}
                    />

                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {name}{' '}
                        <span
                          className={
                            status === 'online'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        >
                          ({status})
                        </span>
                      </Dialog.Title>
                      <p className="text-gray-400">{email}</p>
                    </div>
                  </div>
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

                  <div className="mt-4 flex">
                    <input
                      placeholder="Write a message..."
                      className="border-2 rounded-md px-2 w-full mr-4 border-slate-700"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 ml-auto justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Send
                      <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
