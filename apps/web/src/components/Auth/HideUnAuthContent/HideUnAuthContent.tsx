import { type FC } from 'react'
import { useUser } from '@hooks'
import { IHideUnAuthContentProps } from './types'

export const HideUnAuthContent: FC<IHideUnAuthContentProps> = ({
  children,
}) => {
  const { user, status } = useUser()

  if (status === 'loading' || !!user) return null

  return <>{children}</>
}
