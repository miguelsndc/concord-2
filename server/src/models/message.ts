import { Schema, model } from 'mongoose'

let messageSchema = new Schema({
  body: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    name: String,
    photoUrl: String,
  },
})

export let Message = model('Message', messageSchema)
