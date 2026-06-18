import { Request, Response } from 'express'
import * as leaderboardService from '../services/leaderboardService'

export async function getLeaderboard(req: Request, res: Response) {
  try {
    const { activityId, limit } = req.query
    if (!activityId) return res.status(400).json({ error: 'activityId is required' })

    const results = await leaderboardService.getTopUsersForActivity(String(activityId), Number(limit) || 10)
    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to compute leaderboard' })
  }
}
