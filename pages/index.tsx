import Center from '@/Components/Center'
import Sidebar from '@/Components/Sidebar'
import Head from 'next/head'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden text-white'>
      <Head>
        <title>Spotify 2.0</title>
        <meta name='description' content='Spotify by Henry Web Dev' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
    </div>
  )
}
