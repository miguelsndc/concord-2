import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { connect } from 'mongoose'
import { Message as MessageModel } from './models/message'
import cors from 'cors'

let app = express()
let server = http.createServer(app)
let io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type Message = {
  body: string
  author: {
    name: string
    photoUrl: string
  }
}

connect(
  process.env.DATABASE_URL
).then(
  () => {
    console.log('connected')
  },
  error => {
    console.log(error)
  }
)

io.on('connection', socket => {
  console.log(`A user connected at socket ${socket.id}`)
  socket.on('new-message', (msg: Message) => {
    let message = new MessageModel({
      body: msg.body,
      author: msg.author,
    })

    message.save().then(value => {
      io.emit('new-message', value)
    })
  })
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('All right bro')
})

app.get('/messages', (req, res) => {
  let query = MessageModel.find()

  query.then(value => {
    console.log(value)
    res.json(value)
  })
})

server.listen(3000, () => {
  console.log('Server is running.')
})
