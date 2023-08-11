import { JWT } from 'next-auth/jwt'
import { User } from 'next-auth'

export enum TokenError {
  Refresh_Token_TokenError = ' Refresh_Token_TokenError'
}

export interface ExtendedToken extends JWT {
  access_token: string
  refresh_token: string
  access_token_expires_at: number
  user: User
  error?: TokenError
}
