import Image from 'next/image'
// import { usePlaylistContext } from '@/contexts/PlayListsContexts'
// import useSpotify from '@/hooks/useSpotify'
import defaulImgPlayLists from '../../accets/defaulImagePlaylist.jpg'
import useSpotify from '../../hooks/useSpotify'
import { usePlaylistContext } from '../../contexts/PlayListsContexts'

export default function Sidebar() {
  const spotifyAPI = useSpotify()
  const {
    playlistContextState: { playlists },
    updatePlaylistContext
  } = usePlaylistContext()

  const handleSelectedPlaylist = async (playListId: string) => {
    const resDataPlayLists = await spotifyAPI.getPlaylist(playListId)
    if (resDataPlayLists) {
      updatePlaylistContext({
        selectedPlaylistId: playListId,
        selectedPlaylist: resDataPlayLists.body
      })
    }
  }
  return (
    <div className='text-gray-500  pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen sm:max-w-[12rem] md:max-w-[15rem] lg:max-w-[15rem] hidden md:block lg:block'>
      <div className='bg-gray-900 px-20 py-5 rounded-md space-y-5 w-full '>
        <button className='flex justify-center items-center space-x-3 hover:text-gray-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          <span className='mt-1'>Home</span>
        </button>
        <button className='flex justify-center items-center space-x-3 hover:text-gray-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>

          <span className='mt-1'>Search</span>
        </button>
      </div>
      <div className='mt-10 float-left w-full py-5 rounded-md space-y-5  bg-gray-900 '>
        <button className='pl-5 flex justify-center items-center space-x-3 hover:text-gray-200 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
            />
          </svg>

          <span className='mt-1'>Library</span>
        </button>
        <div className='text-center px-4 py-2 rounded-full mx-2 text-white bg-gradient-to-b from-slate-600 to-slate-800 '>
          Your Playlists
        </div>
        <div className='hide-scrollbar overflow-y-scroll h-screen'>
          {playlists?.map(({ id, name, images }) => (
            <button
              className='flex pl-1 items-center pb-4 pt-2 rounded-sm hover:bg-slate-500 w-full'
              key={id}
              onClick={() => {
                handleSelectedPlaylist(id)
              }}
            >
              <Image src={images[0] ? images[0].url : defaulImgPlayLists} alt={name} height={80} width={80} />
              <p className=' pl-1 text-sm text-slate-400 '>{name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
