import { scopes, spotifyAPI } from '@/config/spotify'
import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { CallbacksOptions } from 'next-auth'
import { ExtendedToken, TokenError } from '@/types'

const refreshAccessToken = async (token: ExtendedToken): Promise<ExtendedToken> => {
  try {
    spotifyAPI.setAccessToken(token.access_token)
    spotifyAPI.setRefreshToken(token.refresh_token)

    /// Hey spotify, please refresh my access token
    const { body: refreshToken } = await spotifyAPI.refreshAccessToken()
    return {
      ...token,
      access_token: refreshToken.access_token,
      refresh_token: refreshToken.refresh_token || token.refresh_token,
      access_token_expires_at: Date.now() + refreshToken.expires_in * 1000
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: TokenError.Refresh_Token_TokenError
    }
  }
}

const jwtCallback: CallbacksOptions['jwt'] = async ({ token, account, user }) => {
  let extendedToken: ExtendedToken
  // user logged in for the first time (cơ chế của spotify là chỉ hiển thị thông tin user ở lần đăng nhập 1 lần )
  if (user && account) {
    extendedToken = {
      ...token,
      user,
      access_token: account.access_token as string,
      refresh_token: account.refresh_token as string,
      access_token_expires_at: (account.expires_at as number) * 1000 // converted to milliseconds
    }
    return extendedToken
  }
  if (Date.now() + 5000 < (token as ExtendedToken).access_token_expires_at) {
    console.log('Access token is still valid, returning Extended token ', token)
    return token
  }

  // access_token has expired, refresh_token it
  console.log('Access token expired ')
  return await refreshAccessToken(token as ExtendedToken)
}
export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: scopes
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    jwt: jwtCallback
  }
})
