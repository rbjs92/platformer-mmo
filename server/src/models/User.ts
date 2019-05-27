import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserInterface extends Document {
  email: string
  password: string
  username: string
  location: string
  date: Date
  hashPassword: any
  comparePassword: any
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model<UserInterface>('User', UserSchema)

User.prototype.hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

User.prototype.comparePassword = (password: string): boolean => {
  return bcrypt.compareSync(password, this.password)
}

export = User
