// import { spotifyAPI } from '@/config/spotify'
// import useSpotify from '@/hooks/useSpotify'
// import { SongReducerAction, SongReducerActionType, songReducer } from '@/reducers/songReducer'
import { useSession } from 'next-auth/react'
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from 'react'
import { SongReducerAction, SongReducerActionType, songReducer } from '../reducers/songReducer'
import useSpotify from '../hooks/useSpotify'
import { spotifyAPI } from '../config/spotify'

export interface SongContextState {
  selectedId?: string | null
  selectedSong: SpotifyApi.TrackObjectFull | null
  isPlaying: boolean
  volume: number
  deviceId: string | null
}

interface SongContext {
  songContextState: SongContextState
  dispatchSongAction: Dispatch<SongReducerAction>
}

const defaultSongContextState: SongContextState = {
  selectedId: undefined,
  selectedSong: null,
  isPlaying: false,
  volume: 50,
  deviceId: null
}

export const SongContext = createContext<SongContext>({
  songContextState: defaultSongContextState,
  dispatchSongAction: () => {}
})

export const useSongContext = () => useContext(SongContext)

export const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const SpotifyAPI = useSpotify()
  const { data: session } = useSession()

  const [songContextState, dispatchSongAction] = useReducer(songReducer, defaultSongContextState)
  // thiết bị chơi nhạc hiện tại
  useEffect(() => {
    const setCurrentDevices = async () => {
      // get current information device (Now)
      const resAvailableDevices = await SpotifyAPI.getMyDevices()
      if (!resAvailableDevices.body.devices.length) return
      const { id: deviceId, volume_percent } = resAvailableDevices.body.devices[0]

      dispatchSongAction({
        type: SongReducerActionType.SetDevice,
        payload: {
          deviceId,
          volume: volume_percent as number
        }
      })

      await spotifyAPI.transferMyPlayback([deviceId as string])
    }
    if (SpotifyAPI.getAccessToken()) {
      setCurrentDevices()
    }
  }, [SpotifyAPI, session])

  // Bài nhạc hiện tại đang chơi là bài gì
  useEffect(() => {
    const getCurrentPlayingSong = async () => {
      // lấy nhạc đang chơi
      const songInfo = await SpotifyAPI.getMyCurrentPlayingTrack()
      console.log('songInfo', songInfo)
      if (!songInfo.body) {
        return
      }
      dispatchSongAction({
        type: SongReducerActionType.SetCurrentPlayingSong,
        payload: {
          selectedId: songInfo.body.item?.id,
          selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
          isPlaying: songInfo.body.is_playing
        }
      })
    }
    if (SpotifyAPI.getAccessToken()) {
      getCurrentPlayingSong()
    }
  }, [SpotifyAPI, session])
  // với songReducer là 1 state nhận các tính hiệu biến đổi
  // defaultSongContextState giá trị state ban đầu

  const SongContextProviderData = {
    songContextState,
    dispatchSongAction
  }

  return <SongContext.Provider value={SongContextProviderData}>{children}</SongContext.Provider>
}
