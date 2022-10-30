import { ChannelList } from './components/ChannelList'
import { Chat } from './components/Chat'
import { ServerList } from './components/ServerList'
import { UserProvider } from './components/UserContext'

function App() {
  return (
    <div className='w-screen min-h-screen flex'>
      <ServerList />
      <UserProvider>
        <ChannelList />
        <Chat />
      </UserProvider>
    </div>
  )
}

export default App
