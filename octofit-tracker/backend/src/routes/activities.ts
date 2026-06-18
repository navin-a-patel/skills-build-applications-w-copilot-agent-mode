import express from 'express'
import * as activityController from '../controllers/activityController'

const router = express.Router()

router.get('/', activityController.listActivities)
router.post('/', activityController.createActivity)

export default router
