import { type FC, type ReactNode } from 'react'
import { useUser } from '@hooks'

interface IWaitForSessionProps {
  children: ReactNode
}

export const WaitForSession: FC<IWaitForSessionProps> = ({ children }) => {
  const { status } = useUser()

  if (status === 'loading') return null

  return <>{children}</>
}
