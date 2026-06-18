import { Schema, model, Document } from 'mongoose'

export interface IActivity extends Document {
  name: string
  description?: string
  unit?: string
  createdAt: Date
}

const ActivitySchema = new Schema<IActivity>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    unit: { type: String, default: 'count' },
  },
  { timestamps: true }
)

export const Activity = model<IActivity>('Activity', ActivitySchema)
