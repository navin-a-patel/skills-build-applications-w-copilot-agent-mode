import { Workout } from '../models/Workout'
import { Types } from 'mongoose'

export async function findWorkouts(opts: { limit?: number } = {}) {
  const limit = opts.limit ?? 100
  return Workout.find()
    .sort({ date: -1 })
    .limit(limit)
    .populate('user', 'name email')
    .populate('team', 'name')
    .populate('activity', 'name unit')
    .lean()
    .exec()
}

export async function createWorkout(data: { userId: string; teamId?: string; activityId: string; value: number; date?: Date }) {
  const doc: any = {
    user: Types.ObjectId(data.userId),
    activity: Types.ObjectId(data.activityId),
    value: data.value,
    date: data.date || new Date(),
  }
  if (data.teamId) doc.team = Types.ObjectId(data.teamId)

  const w = new Workout(doc)
  return w.save()
}
