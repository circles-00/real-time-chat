import { type FC } from 'react'
import { useUser } from '@hooks'
import { IHideAuthContentProps } from './types'

export const HideAuthContent: FC<IHideAuthContentProps> = ({ children }) => {
  const { user, status } = useUser()

  if (status === 'loading' || !user) return null

  return <>{children}</>
}
