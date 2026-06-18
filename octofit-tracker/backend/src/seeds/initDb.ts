import dotenv from 'dotenv'
import { connectDB } from '../db'
import { User } from '../models/User'

dotenv.config()

const USERS = [
  { name: 'Alice Runner', email: 'alice@example.com' },
  { name: 'Bob Cyclist', email: 'bob@example.com' },
  { name: 'Carol Swimmer', email: 'carol@example.com' },
  { name: 'Dave Climber', email: 'dave@example.com' }
]

async function seed() {
  await connectDB()

  for (const u of USERS) {
    try {
      // use upsert to avoid duplicates when re-running the script
      await User.updateOne({ email: u.email }, { $setOnInsert: u }, { upsert: true })
      console.log(`Seeded user ${u.email}`)
    } catch (err) {
      console.error(`Failed to seed user ${u.email}:`, err)
    }
  }

  console.log('Database seeding complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
