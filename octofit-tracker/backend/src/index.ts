import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './db'

dotenv.config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

async function start() {
  await connectDB()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => res.json({ status: 'ok' }))

  app.use('/api/users', usersRouter)
  app.use('/api/teams', teamsRouter)
  app.use('/api/activities', activitiesRouter)
  app.use('/api/workouts', workoutsRouter)
  app.use('/api/leaderboard', leaderboardRouter)

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err)
    res.status(err?.status || 500).json({ error: err?.message || 'internal error' })
  })

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start app:', err)
  process.exit(1)
})
