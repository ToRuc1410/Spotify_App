import React from 'react'
import { GetServerSideProps } from 'next'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import SpotifyLogo from '../accets/spotify-logo.png'
interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>
}

export default function Login({ providers }: Props) {
  const { name: providerName, id: providerId } = providers?.spotify as ClientSafeProvider
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black'>
      <div className='mb-6'>
        <Image src={SpotifyLogo} alt='Spotify Logo' height={200} width={200} />
      </div>
      <button
        className='bg-green-500 px-6 py-4 rounded-full text-white hover:bg-green-400'
        onClick={() => {
          signIn(providerId, { callbackUrl: '/' })
        }}
      >
        Login With {providerName}
      </button>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}
