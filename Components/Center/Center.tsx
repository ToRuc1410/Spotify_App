import { usePlaylistContext } from '@/contexts/PlayListsContexts'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import userIcon from '../../accets/user.png'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { pickRandomColor } from '@/utils/pickRandomColor'
import Songs from '../Songs'

const colors = ['from-darkslategray', 'from-darkslatepurple', 'from-darkslategrown', 'from-indigo-500', 'darkslatered']
export default function Center() {
  const {
    playlistContextState: { selectedPlaylist, selectedPlaylistId }
  } = usePlaylistContext()
  console.log('selectedPlaylist', selectedPlaylist)
  const { data: session } = useSession()

  const [changeColor, setChangeColor] = useState<string>(colors[0])

  // Note: will change color with PlaylistId
  useEffect(() => {
    setChangeColor(pickRandomColor(colors))
  }, [selectedPlaylistId])
  return (
    <div
      className={classNames(
        `${changeColor} text-grow text-white h-screen overflow-y-scroll hide-scrollbar w-full bg-gradient-to-b to-black`
      )}
    >
      <header className=' flex justify-end items-center w-full p-3'>
        {/* Profile dropdown */}
        <Menu as='div' className='lg:relative ml-3 shadow-lg hidden md:block lg:block'>
          <div>
            <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800'>
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>Open user menu</span>
              <Image
                src={session?.user?.image || userIcon}
                alt={session?.user?.name || 'avatar User'}
                height={50}
                width={50}
                className='rounded-full object-cover '
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 mt-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                />
              </svg>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    onClick={() => {
                      signOut()
                    }}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>
      <section className='mt-5'>
        {selectedPlaylist ? (
          <>
            <div className='flex flex-col lg:flex-row justify-start lg:justify-center md:justify-center md:items-center lg:items-center lg:place-items-end'>
              <Image
                src={selectedPlaylist.images[0]?.url || userIcon}
                alt={'PlayList image'}
                height={200}
                width={200}
                className='object-cover h-auto w-auto px-20 lg:px-0 py-2'
              />
              <div className='ml-5'>
                <h1 className=' text-3xl md:text-3xl lg:md:text-6xl font-extrabold'>{selectedPlaylist.name}</h1>
                <div className='mt-2 flex items-end space-x-2'>
                  <p className='text-sm'>{session?.user?.name}</p>
                  <div className='w-5 border-white border bg-white h-1' />
                  <p className='text-sm'>{selectedPlaylist.tracks.total} Songs</p>
                </div>
                <p></p>
              </div>
            </div>
            <Songs />
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  )
}
