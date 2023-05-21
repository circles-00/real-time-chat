import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { RootProvider } from '@providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider session={pageProps.session}>
      <Component {...pageProps} />
    </RootProvider>
  )
}
