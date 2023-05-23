import { type FC } from 'react'
import Image from 'next/image'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { IUserDetailsProps } from './types'
import { WaitForSession } from '@components'

export const UserDetails: FC<IUserDetailsProps> = ({
  onHandleOpenChatDialog,
  isMyself,
  ...user
}) => {
  return (
    <div className="bg-white justify-between w-96 flex items-center border-2 p-4 rounded-md border-slate-500">
      <p
        className={
          user?.status === 'online' ? 'text-green-500' : 'text-red-500'
        }
      >
        {user?.status}
      </p>
      <p>
        {user?.name}{' '}
        <span className="text-red-500">{isMyself ? '(me)' : ''}</span>{' '}
      </p>
      <Image width={50} height={50} src={user?.avatar} alt={'avatar'} />
      <button
        className="font-bold"
        onClick={() => onHandleOpenChatDialog(user)}
      >
        <WaitForSession>
          {!isMyself && (
            <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
          )}
        </WaitForSession>
      </button>
    </div>
  )
}
