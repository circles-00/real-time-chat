import { type FC } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'

interface IChatDiallogHeaderProps {
  email: string
  name: string
  status: string
  avatar: string
}

export const ChatDiallogHeader: FC<IChatDiallogHeaderProps> = ({
  name,
  avatar,
  status,
  email,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Image src={avatar} alt={'User Avatar'} width={50} height={50} />

      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {name}{' '}
          <span
            className={status === 'online' ? 'text-green-500' : 'text-red-500'}
          >
            ({status})
          </span>
        </Dialog.Title>
        <p className="text-gray-400">{email}</p>
      </div>
    </div>
  )
}
