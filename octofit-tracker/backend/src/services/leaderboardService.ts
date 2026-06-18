import { Workout } from '../models/Workout'
import { Types } from 'mongoose'

export async function getTopUsersForActivity(activityId: string, limit = 10) {
  const aId = Types.ObjectId(activityId)
  const pipeline = [
    { $match: { activity: aId } },
    {
      $group: {
        _id: '$user',
        total: { $sum: '$value' },
        count: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        userId: '$_id',
        userName: '$user.name',
        userEmail: '$user.email',
        total: 1,
        count: 1,
      },
    },
  ]

  return Workout.aggregate(pipeline).exec()
}
