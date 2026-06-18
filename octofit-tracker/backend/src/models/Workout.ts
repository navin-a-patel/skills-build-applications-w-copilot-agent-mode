import { Schema, model, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user: Types.ObjectId
  team?: Types.ObjectId
  activity: Types.ObjectId
  value: number
  date: Date
  metadata?: Record<string, any>
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    value: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
)

WorkoutSchema.index({ user: 1 })
WorkoutSchema.index({ team: 1 })
WorkoutSchema.index({ activity: 1 })

export const Workout = model<IWorkout>('Workout', WorkoutSchema)
