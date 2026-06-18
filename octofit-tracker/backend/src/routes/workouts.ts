import express from 'express'
import * as workoutController from '../controllers/workoutController'

const router = express.Router()

router.get('/', workoutController.listWorkouts)
router.post('/', workoutController.createWorkout)

export default router
