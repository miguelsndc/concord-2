import { useUser } from './UserContext'

export function ChannelList() {
  const { user, setUser } = useUser()

  return (
    <aside className='flex-fixed-20/100 bg-gray-600 flex flex-col'>
      <header className='p-4 border-b border-b-gray-500'>
        <h1 className='font-medium font-lg'>CHANNEL</h1>
      </header>
      <div className='p-4 flex flex-col justify-between flex-1'>
        <div className='flex flex-col gap-4 flex-1'>
          <div>
            <strong className='uppercase text-sm text-gray-500'>
              canais de texto
            </strong>
            <ul>
              <li>Texto 1</li>
              <li>Texto 2</li>
            </ul>
          </div>
        </div>
        <footer className='flex flex-col justify-center gap-2'>
          <input
            onChange={ev => setUser({ ...user, name: ev.target.value })}
            value={user.name}
            className='w-full rounded-full p-2 bg-gray-800 text-lg text-center'
            type='text'
          />
          <input
            onChange={ev => setUser({ ...user, photoUrl: ev.target.value })}
            value={user.photoUrl}
            className='w-full rounded p-1 bg-gray-800 text-sm'
            type='text'
          />
          <img
            src={user.photoUrl}
            alt={user.name}
            className='w-full max-w-xs aspect-square rounded bg-gray-900'
          />
        </footer>
      </div>
    </aside>
  )
}
