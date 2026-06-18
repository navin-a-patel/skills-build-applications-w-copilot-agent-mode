import { Request, Response } from 'express'
import * as activityService from '../services/activityService'

export async function listActivities(_req: Request, res: Response) {
  try {
    const activities = await activityService.findActivities()
    res.json(activities)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch activities' })
  }
}

export async function createActivity(req: Request, res: Response) {
  try {
    const { name, description, unit } = req.body
    if (!name) return res.status(400).json({ error: 'name is required' })

    const activity = await activityService.createActivity({ name, description, unit })
    res.status(201).json(activity)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ error: err?.message || 'failed to create activity' })
  }
}
