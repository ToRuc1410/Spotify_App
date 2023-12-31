// import Center from '@/Components/Center'
// import Player from '@/Components/Player'
// import Sidebar from '@/Components/Sidebar'
// import PlaylistContextProvider from '@/contexts/PlayListsContexts'
// import { SongContextProvider } from '@/contexts/SongContext'
import Head from 'next/head'
import PlaylistContextProvider from '../contexts/PlayListsContexts'
import { SongContextProvider } from '../contexts/SongContext'
import Sidebar from '../Components/Sidebar'
import Center from '../Components/Center'
import Player from '../Components/Player'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden text-white'>
      <PlaylistContextProvider>
        <SongContextProvider>
          <Head>
            <title>Spotify App</title>
            <meta name='description' content='Spotify by Tờ Rúc Dev' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <main className='flex space-x-4'>
            <Sidebar />
            <Center />
          </main>
          <div className='sticky bottom-0 bg-slate-900 text-white w-full'>
            <Player />
          </div>
        </SongContextProvider>
      </PlaylistContextProvider>
    </div>
  )
}
