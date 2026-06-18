import { Request, Response } from 'express'
import * as userService from '../services/userService'

export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await userService.findUsers({ limit: 50 })
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch users' })
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' })
    }

    const user = await userService.createUser({ name, email })
    res.status(201).json(user)
  } catch (err: any) {
    console.error(err)
    // Handle duplicate key error from mongoose
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'email already exists' })
    }
    res.status(400).json({ error: err?.message || 'failed to create user' })
  }
}
