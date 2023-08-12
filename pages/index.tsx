import Center from '@/Components/Center'
import Sidebar from '@/Components/Sidebar'
import PlaylistContextProvider from '@/contexts/PlayListsContexts'
import Head from 'next/head'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden text-white'>
      <PlaylistContextProvider>
        <Head>
          <title>Spotify App</title>
          <meta name='description' content='Spotify by Tờ Rúc Dev' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='flex'>
          <Sidebar />
          <Center />
        </main>
      </PlaylistContextProvider>
    </div>
  )
}
