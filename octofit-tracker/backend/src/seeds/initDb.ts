import dotenv from 'dotenv'
import { connectDB } from '../db'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'

dotenv.config()

const USERS = [
  { name: 'Alice Runner', email: 'alice@example.com' },
  { name: 'Bob Cyclist', email: 'bob@example.com' },
  { name: 'Carol Swimmer', email: 'carol@example.com' },
  { name: 'Dave Climber', email: 'dave@example.com' },
  { name: 'Eve Sprinter', email: 'eve@example.com' }
]

const TEAMS = [
  { name: 'Team Swift' },
  { name: 'Team Endurance' }
]

const ACTIVITIES = [
  { name: 'Running', description: 'Outdoor running', unit: 'meters' },
  { name: 'Cycling', description: 'Bike distance', unit: 'meters' },
  { name: 'Swimming', description: 'Pool laps', unit: 'meters' }
]

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function seed() {
  await connectDB()

  // Seed activities
  const activityDocs: any[] = []
  for (const a of ACTIVITIES) {
    const doc = await Activity.updateOne({ name: a.name }, { $setOnInsert: a }, { upsert: true })
    // find or create
    const found = await Activity.findOne({ name: a.name }).lean().exec()
    if (found) activityDocs.push(found)
  }

  // Seed users
  const userDocs: any[] = []
  for (const u of USERS) {
    await User.updateOne({ email: u.email }, { $setOnInsert: u }, { upsert: true })
    const found = await User.findOne({ email: u.email }).lean().exec()
    if (found) userDocs.push(found)
  }

  // Seed teams and assign members
  const teamDocs: any[] = []
  for (let i = 0; i < TEAMS.length; i++) {
    const t = TEAMS[i]
    await Team.updateOne({ name: t.name }, { $setOnInsert: t }, { upsert: true })
    const found = await Team.findOne({ name: t.name }).exec()
    if (found) {
      // assign roughly half of users to each team (overlap possible)
      const members = userDocs.filter((_u, idx) => idx % TEAMS.length === i).map((u) => u._id)
      found.members = members
      await found.save()
      teamDocs.push(found)
    }
  }

  // Seed workouts: random workouts for each user
  const workoutCountPerUser = 8
  for (const user of userDocs) {
    for (let i = 0; i < workoutCountPerUser; i++) {
      const activity = activityDocs[randInt(0, activityDocs.length - 1)]
      const team = teamDocs[randInt(0, teamDocs.length - 1)]
      const daysAgo = randInt(0, 30)
      const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
      const value = randInt(500, 5000) // e.g., meters

      await Workout.create({
        user: user._id,
        team: team?._id,
        activity: activity._id,
        value,
        date,
      })
    }
  }

  console.log('Seeding complete:')
  console.log(`  activities: ${activityDocs.length}`)
  console.log(`  users: ${userDocs.length}`)
  console.log(`  teams: ${teamDocs.length}`)
  console.log(`  workouts per user: ${workoutCountPerUser}`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
