import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

let app = express()
let server = http.createServer(app)
let io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type Message = {
  id: number
  content: string
  author: {
    id: string
    name: string
    photoUrl: string
  }
  sentAt: Date
}

let messages: Message[] = []
let id = 0

io.on('connection', socket => {
  console.log(`A user connected at socket ${socket.id}`)
  socket.on('new-message', (message: Omit<Message, 'id'>) => {
    let newLength = messages.push({
      id: id++,
      ...message,
      author: {
        ...message.author,
      },
    })

    io.emit('new-message', messages[newLength - 1])
  })
})

app.use(express.json())

app.get('/', (req, res) => {
  res.json('All right bro')
})

server.listen(3000, () => {
  console.log('Server is running.')
})
