import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { RootProvider } from '@providers'
import { WebSocketProvider } from '../providers/WebSocketProvider/WebSocketProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider session={pageProps.session}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </RootProvider>
  )
}
