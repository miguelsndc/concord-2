import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { io, Socket } from 'socket.io-client'
import { useUser } from './UserContext'

type Message = {
  _id: number
  body: string
  author: {
    name: string
    photoUrl: string
  }
  createdAt: Date
}

function connectChatServer() {
  let socket = io('http://localhost:3000/')

  socket.onAny((type, message) => console.log(type, message))

  return socket
}

export function Chat() {
  let [text, setText] = useState('')
  let [messages, setMessages] = useState<Message[]>([])
  let messageListRef = useRef<HTMLUListElement | null>(null)
  let socketRef = useRef<Socket>()
  let { user } = useUser()

  function scrollToNewMessage() {
    let newMessage = messageListRef.current?.lastElementChild

    newMessage?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  function handleSendMessage(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    if (!socketRef.current) throw new Error('wtf just happened')
    if (text.trim() === '') return

    let socket = socketRef.current
    let body = text.trim()

    socket.emit('new-message', {
      body,
      author: {
        name: user.name,
        photoUrl: user.photoUrl,
      },
    })

    setText('')
  }

  useEffect(() => {
    let socket = connectChatServer()
    socketRef.current = socket

    socket.on('new-message', (message: Message) => {
      flushSync(() => {
        setMessages(messages => messages.concat(message))
      })
      scrollToNewMessage()
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <main className='h-screen flex-fixed-74/100 bg-gray-700 flex flex-col'>
      <header className='p-4'>
        <h1 className='font-medium text-xl'>Chat name</h1>
      </header>
      <ul
        ref={messageListRef}
        className='flex-1 overflow-y-auto flex flex-col gap-10 p-4 scrollbar'
      >
        {messages.map(message => {
          return (
            <li key={message._id} className='flex items-start gap-4'>
              <img
                className='w-16 h-16 object-cover rounded-full bg-gray-900'
                src={message.author.photoUrl}
                alt=''
              />
              <div>
                <strong className='text-lg'>{message.author.name}</strong>
                <p className=''>{message.body}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <footer className='p-4'>
        <form onSubmit={handleSendMessage}>
          <input
            className='w-full rounded p-2 bg-gray-800 '
            onChange={ev => setText(ev.target.value)}
            value={text}
            type='text'
            name=''
            id=''
          />
        </form>
      </footer>
    </main>
  )
}
