import { FC } from 'react'
import Image from 'next/image'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { IUserDetailsProps } from './types'

export const UserDetails: FC<IUserDetailsProps> = ({
  name,
  status,
  avatar,
}) => {
  return (
    <div className="bg-white justify-between w-96 flex items-center border-2 p-4 rounded-md border-slate-500">
      <p className="text-green-500">{status}</p>
      <p>{name}</p>
      <Image width={50} height={50} src={avatar} alt={'avatar'} />
      <button className="font-bold">
        <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
      </button>
    </div>
  )
}
