import '../styles/globals.css'
import { Lato, Cormorant_Garamond } from '@next/font/google'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-cormorant',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lato.variable} ${cormorant.variable} font-sans bg-[#EAE5E5] tracking-widest`}>
      <Head>
        <title>AJ Wedding</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </main>
  )
}
