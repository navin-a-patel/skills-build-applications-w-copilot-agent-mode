import { Request, Response } from 'express'
import * as teamService from '../services/teamService'

export async function listTeams(_req: Request, res: Response) {
  try {
    const teams = await teamService.findTeams()
    res.json(teams)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch teams' })
  }
}

export async function createTeam(req: Request, res: Response) {
  try {
    const { name, memberIds } = req.body
    if (!name) return res.status(400).json({ error: 'name is required' })

    const team = await teamService.createTeam({ name, memberIds: memberIds || [] })
    res.status(201).json(team)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ error: err?.message || 'failed to create team' })
  }
}
