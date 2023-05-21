import { useSession } from 'next-auth/react'

export const useUser = () => {
  const { data: user, status } = useSession()

  return { user, status, isAuthenticated: status !== 'loading' && !!user }
}
