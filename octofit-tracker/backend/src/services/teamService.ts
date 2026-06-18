import { Team } from '../models/Team'
import { Types } from 'mongoose'

export async function findTeams() {
  return Team.find().populate('members', 'name email').lean().exec()
}

export async function createTeam(data: { name: string; memberIds: string[] }) {
  const members = (data.memberIds || []).map((id) => Types.ObjectId(id))
  const team = new Team({ name: data.name, members })
  return team.save()
}
