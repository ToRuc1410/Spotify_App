// import { usePlaylistContext } from '@/contexts/PlayListsContexts'
import { usePlaylistContext } from '../../contexts/PlayListsContexts'
import Song from '../Song'

export default function Songs() {
  const {
    playlistContextState: { selectedPlaylist }
  } = usePlaylistContext()
  if (!selectedPlaylist) return null
  if (selectedPlaylist && selectedPlaylist.tracks.total === 0)
    return (
      <div className='text-xl py-32 flex items-center justify-center text-slate-300'>
        Danh sách bài hát trong PlayList này của bạn đang trống
      </div>
    )
  return (
    <div className='relative h-screen hide-scrollbar overflow-y-scroll  overflow-x-auto '>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-white '>
          <tr>
            <th scope='col' className='px-3 py-3'>
              #
            </th>
            <th scope='col' className='px-3 py-3'>
              Title
            </th>
            <th scope='col' className='px-6 py-3 hidden md:table-cell lg:table-cell'>
              Album
            </th>
            <th scope='col' className='px-6 py-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedPlaylist &&
            selectedPlaylist.tracks.items.map((item, index) => (
              <Song key={item.track?.id} item={item} itemIndex={index} />
            ))}
        </tbody>
      </table>
    </div>
  )
}
