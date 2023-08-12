import { spotifyAPI } from '@/config/spotify'
import { ExtendedSession, TokenError } from '@/types'
import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
const useSpotify = () => {
  const { data: session } = useSession()
  useEffect(() => {
    // case 1 : session is not already
    if (!session) return
    // case 2 : if refresh_token is failed then will redirect to login
    if ((session as ExtendedSession).error === TokenError.Refresh_Token_TokenError) {
      signIn()
    }

    spotifyAPI.setAccessToken((session as ExtendedSession).access_token)
  }, [session])

  return spotifyAPI
}

export default useSpotify
