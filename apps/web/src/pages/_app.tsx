import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { RootProvider, WebSocketProvider } from '@providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider session={pageProps.session}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </RootProvider>
  )
}
