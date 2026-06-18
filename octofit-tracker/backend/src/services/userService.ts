import { User, IUser } from '../models/User'

export async function findUsers(opts: { limit?: number } = {}): Promise<Partial<IUser>[]> {
  const limit = opts.limit ?? 50
  return User.find().limit(limit).lean().exec()
}

export async function createUser(data: { name: string; email: string }) {
  const user = new User({ name: data.name, email: data.email })
  return user.save()
}
