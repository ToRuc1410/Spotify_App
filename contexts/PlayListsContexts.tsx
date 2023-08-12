import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify'

interface PlaylistContextState {
  playlists: any[]
}

interface PlaylistContext {
  playlistContextState: PlaylistContextState
}

/// default Playlist
const defaultPlaylistContextState: PlaylistContextState = {
  playlists: []
}

export const PlaylistContext = createContext<PlaylistContext>({
  playlistContextState: defaultPlaylistContextState
})

export const usePlaylistContext = () => useContext(PlaylistContext)

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyAPI = useSpotify()
  const { data: session } = useSession()
  const [playlistContextState, setplaylistContextState] = useState(defaultPlaylistContextState)

  /// call spotifyAPI when user logged in with session had access_token => value
  useEffect(() => {
    // func getUserPlayList
    const getUserPlayLists = async () => {
      const resGetUserPlaylist = await spotifyAPI.getUserPlaylists()
      // success
      if (resGetUserPlaylist) {
        setplaylistContextState({
          playlists: resGetUserPlaylist.body.items
        })
      }
    }

    // listen session have access_token => value and !undefined because session is undefined => not logged in
    // and if session is changed => useEffect() will be changed
    if (spotifyAPI.getAccessToken()) {
      getUserPlayLists()
    }
  }, [session, spotifyAPI])

  const playlistContextProviderData = {
    playlistContextState
  }

  return <PlaylistContext.Provider value={playlistContextProviderData}>{children}</PlaylistContext.Provider>
}

export default PlaylistContextProvider
