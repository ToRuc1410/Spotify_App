import Center from '@/Components/Center'
import Sidebar from '@/Components/Sidebar'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
    </div>
  )
}
