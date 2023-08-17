import { useSongContext } from '@/contexts/SongContext'
import useSpotify from '@/hooks/useSpotify'
import { SongReducerActionType } from '@/reducers/songReducer'
import Image from 'next/image'
import { ChangeEventHandler } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function Player() {
  const spotifyAPI = useSpotify()
  const {
    songContextState: { isPlaying, selectedSong, deviceId, volume },
    dispatchSongAction
  } = useSongContext()

  const handlePlayMusic = async () => {
    const resStatusMusic = await spotifyAPI.getMyCurrentPlaybackState()
    if (!resStatusMusic.body) return

    if (resStatusMusic.body.is_playing) {
      await spotifyAPI.pause()

      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: false
      })
    } else {
      await spotifyAPI.play()

      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: true
      })
    }
  }

  const handlePrevSong = async (skipTo: 'prev' | 'next') => {
    if (!deviceId) return

    if (skipTo === 'prev') {
      await spotifyAPI.skipToPrevious()
    } else {
      await spotifyAPI.skipToNext()
    }
    const songInfor = await spotifyAPI.getMyCurrentPlayingTrack()

    if (!songInfor.body) return
    else {
      dispatchSongAction({
        type: SongReducerActionType.SetCurrentPlayingSong,
        payload: {
          selectedId: songInfor.body.item?.id,
          selectedSong: songInfor.body.item as SpotifyApi.TrackObjectFull,
          isPlaying: songInfor.body.is_playing
        }
      })
    }
  }

  // func: for Volume will delaying for 500 miliseconds then request to SpotifyApi
  const debouncedSetVolume = useDebouncedCallback((volume: number) => {
    spotifyAPI.setVolume(volume)
  }, 500)

  const handleVolume: ChangeEventHandler<HTMLInputElement> = (event) => {
    const volume = Number(event.target.value)
    if (!deviceId) return
    debouncedSetVolume(volume)
    dispatchSongAction({
      type: SongReducerActionType.SetVolume,
      payload: volume
    })
  }

  return (
    <div className='h-20 my-2 bg-gradient-to-b from-slate-900 to-black grid grid-cols-12 gap-3 text-xs md:text-base lg:text-base px-2 '>
      {/* Left Player : now Information Song */}
      <div className='col-span-4 flex items-center'>
        {selectedSong && (
          <div className='flex justify-start items-center '>
            <Image
              src={selectedSong.album.images[0].url}
              height={50}
              width={50}
              alt={`image for ${selectedSong.name} `}
            />
            <div className=''>
              <div className='hidden md:block font-mono'>{selectedSong.name}</div>
              <div className='flex'>
                {selectedSong.artists.map((item, index) => (
                  <p key={item.id}>
                    {index !== 0 && ','}

                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Playing song */}
      <div className='col-span-4 flex space-x-2 justify-between py-2 items-center'>
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
            d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
          />
        </svg>
        {/* pre Song */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
          onClick={() => handlePrevSong('prev')}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        {/* ============================================================== */}
        {/* Pause Song */}
        {isPlaying ? (
          <button onClick={handlePlayMusic} className='bg-slate-100 rounded-full px-4 py-2 text-black text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 hover:w-8 hover:h-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25v13.5m-7.5-13.5v13.5' />
            </svg>
          </button>
        ) : (
          <button onClick={handlePlayMusic} className='bg-slate-100 rounded-full px-4 py-2 text-black text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 hover:w-8 hover:h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            </svg>
          </button>
        )}

        {/* ============================================================== */}
        {/* next Song */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
          onClick={() => handlePrevSong('next')}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>

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
            d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
          />
        </svg>
      </div>

      {/* Volume of Song */}
      <div className='col-span-4 flex justify-center items-center space-x-2'>
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
            d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
          />
        </svg>
        <input type='range' min={0} max={100} className='w-20' value={volume} onChange={handleVolume} />
      </div>
    </div>
  )
}
