import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}

export default mongoose
