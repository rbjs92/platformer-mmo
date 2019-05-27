import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true) // removes deprecation warning

const db = process.env.MONGO_DB

export = {
  init() {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log('Connected to MongoDB.'))
      .catch((err: any) => console.log(err))
  },
}
