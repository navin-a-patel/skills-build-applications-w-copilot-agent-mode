import { Request, Response } from 'express'
import * as workoutService from '../services/workoutService'

export async function listWorkouts(req: Request, res: Response) {
  try {
    const { limit } = req.query
    const workouts = await workoutService.findWorkouts({ limit: Number(limit) || 100 })
    res.json(workouts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch workouts' })
  }
}

export async function createWorkout(req: Request, res: Response) {
  try {
    const { userId, teamId, activityId, value, date } = req.body
    if (!userId || !activityId || value == null) {
      return res.status(400).json({ error: 'userId, activityId and value are required' })
    }

    const workout = await workoutService.createWorkout({
      userId,
      teamId,
      activityId,
      value: Number(value),
      date: date ? new Date(date) : new Date(),
    })

    res.status(201).json(workout)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ error: err?.message || 'failed to create workout' })
  }
}
