import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IRootProvider } from './types'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
})
export const RootProvider: FC<IRootProvider> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
