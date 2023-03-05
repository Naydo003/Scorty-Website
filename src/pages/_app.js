import { EscortProvider } from '@/common/contexts/escort-context'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <EscortProvider>
      <Component {...pageProps} />
    </EscortProvider>
  )
}
