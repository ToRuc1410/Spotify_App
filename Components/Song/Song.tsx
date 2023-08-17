import Image from 'next/image'
import { convertMillisecondsToHHMM } from '@/utils/convertTime'
import useSpotify from '@/hooks/useSpotify'
import { useSongContext } from '@/contexts/SongContext'
import { SongReducerActionType } from '@/reducers/songReducer'
import { usePlaylistContext } from '@/contexts/PlayListsContexts'
interface props {
  itemIndex: number
  item: SpotifyApi.PlaylistTrackObject
}

export default function Song({ item: { track }, itemIndex }: props) {
  console.log('item', track)
  const SpotifyApi = useSpotify()
  const {
    songContextState: { deviceId },
    dispatchSongAction
  } = useSongContext()

  const {
    playlistContextState: { selectedPlaylist }
  } = usePlaylistContext()

  const handlePlayMusic = async () => {
    if (!deviceId) return
    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedId: track?.id,
        selectedSong: track,
        isPlaying: true
      }
    })
    await SpotifyApi.play({
      device_id: deviceId,
      context_uri: selectedPlaylist?.uri,
      offset: {
        uri: track?.uri as string
      }
    })
  }
  return (
    <>
      {track && (
        <tr
          className='text-white dark:bg-gray-800 text-[14px] lg:text-sm md:text-sm font-semibold hover:bg-gray-800 cursor-pointer'
          onClick={handlePlayMusic}
        >
          <th scope='row' className='px-3 py-1 dark:text-white'>
            {itemIndex + 1}
          </th>
          <td className='px-3 py-1 flex items-center'>
            <Image
              src={track?.album.images[0].url || ''}
              alt={'Image Music'}
              height={50}
              width={50}
              className='object-cover h-auto w-auto lg:px-0 mr-4'
            />
            <div className='flex flex-col'>
              <p className='truncate'>{track.name}</p>
              <p className='text-xs '>{track.artists[0].name}</p>
            </div>
          </td>
          <td className='px-6 py-3 hidden md:table-cell lg:table-cell truncate'>{track.album.name}</td>
          <td className='px-6 py-1'>{convertMillisecondsToHHMM(track.duration_ms as number)}</td>
        </tr>
      )}
    </>
  )
}
