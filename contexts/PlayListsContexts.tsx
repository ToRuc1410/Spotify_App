import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'

interface PlaylistContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
  selectedPlaylistId: string | null
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null
}

interface PlaylistContext {
  playlistContextState: PlaylistContextState
  updatePlaylistContext: (updateObj: Partial<PlaylistContextState>) => void
}

/// default Playlist
const defaultPlaylistContextState: PlaylistContextState = {
  playlists: [],
  selectedPlaylistId: null,
  selectedPlaylist: null
}

export const PlaylistContext = createContext<PlaylistContext>({
  playlistContextState: defaultPlaylistContextState,
  updatePlaylistContext: () => {}
})

export const usePlaylistContext = () => useContext(PlaylistContext)

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyAPI = useSpotify()
  const { data: session } = useSession()
  const [playlistContextState, setplaylistContextState] = useState(defaultPlaylistContextState)

  const updatePlaylistContext = (updateObj: Partial<PlaylistContextState>) => {
    setplaylistContextState((prev) => ({
      ...prev,
      ...updateObj
    }))
  }

  /// call spotifyAPI when user logged in with session had access_token => value
  useEffect(() => {
    // func getUserPlayList
    const getUserPlayLists = async () => {
      const resGetUserPlaylist = await spotifyAPI.getUserPlaylists()
      // success
      if (resGetUserPlaylist) {
        updatePlaylistContext({ playlists: resGetUserPlaylist.body.items })
      }
    }

    // listen session have access_token => value and !undefined because session is undefined => not logged in
    // and if session is changed => useEffect() will be changed
    if (spotifyAPI.getAccessToken()) {
      getUserPlayLists()
    }
  }, [session, spotifyAPI])

  const playlistContextProviderData = {
    playlistContextState,
    updatePlaylistContext
  }

  return <PlaylistContext.Provider value={playlistContextProviderData}>{children}</PlaylistContext.Provider>
}

export default PlaylistContextProvider
