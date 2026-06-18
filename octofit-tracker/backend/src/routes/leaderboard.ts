import express from 'express'
import * as leaderboardController from '../controllers/leaderboardController'

const router = express.Router()

// GET /api/leaderboard?activityId=<id>&limit=10
router.get('/', leaderboardController.getLeaderboard)

export default router
