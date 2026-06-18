import { Activity } from '../models/Activity'

export async function findActivities() {
  return Activity.find().lean().exec()
}

export async function createActivity(data: { name: string; description?: string; unit?: string }) {
  const activity = new Activity({ name: data.name, description: data.description, unit: data.unit })
  return activity.save()
}
