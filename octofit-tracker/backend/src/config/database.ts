import mongoose from 'mongoose';

const DB_NAME = 'octofit_db';
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

export default mongoose;
