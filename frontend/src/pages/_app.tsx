import Header from '@/components/header/header'
import 'bootstrap/dist/css/bootstrap.min.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      {
        router.pathname !== '/signin' &&
        router.pathname !== '/signup' &&
        <Header />
      }
      <Component {...pageProps} />
    </>
  )
}
