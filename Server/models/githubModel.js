import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const githubSchema = new Schema({
  displayName: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  profileUrl: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  bio: {
    type: String
  },
  githubToken: {
    type: String
  }
},
{
  timestamps: true
})

export default mongoose.model('Github', githubSchema, 'githubUsers')