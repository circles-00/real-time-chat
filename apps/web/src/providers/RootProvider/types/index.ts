import { ReactNode } from 'react'
import { Session } from 'next-auth'

export interface IRootProvider {
  children: ReactNode
  session: Session
}
