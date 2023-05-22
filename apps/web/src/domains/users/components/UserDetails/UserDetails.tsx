import { FC, useState } from 'react'
import Image from 'next/image'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { IUserDetailsProps } from './types'
import { WaitForSession } from '@components'
import { ChatDialog } from '@domain/chat'

export const UserDetails: FC<IUserDetailsProps> = ({
  name,
  status = 'offline',
  avatar,
  isMyself,
  email,
  id,
}) => {
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false)

  return (
    <div className="bg-white justify-between w-96 flex items-center border-2 p-4 rounded-md border-slate-500">
      <ChatDialog
        open={isChatDialogOpen}
        onClose={() => setIsChatDialogOpen(false)}
        name={name}
        status={status}
        avatar={avatar}
        id={id}
        email={email}
      />

      <p className={status === 'online' ? 'text-green-500' : 'text-red-500'}>
        {status}
      </p>
      <p>
        {name} <span className="text-red-500">{isMyself ? '(me)' : ''}</span>{' '}
      </p>
      <Image width={50} height={50} src={avatar} alt={'avatar'} />
      <button className="font-bold" onClick={() => setIsChatDialogOpen(true)}>
        <WaitForSession>
          {!isMyself && (
            <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
          )}
        </WaitForSession>
      </button>
    </div>
  )
}
