import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DEFAULT_DB = 'octofit_db'
const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || '27017'
const dbName = process.env.MONGO_DB || DEFAULT_DB

const MONGO_URL = process.env.MONGO_URL || `mongodb://${host}:${port}/${dbName}`

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB at', MONGO_URL)
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}

export default mongoose
