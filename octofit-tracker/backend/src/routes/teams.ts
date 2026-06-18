import express from 'express'
import * as teamController from '../controllers/teamController'

const router = express.Router()

router.get('/', teamController.listTeams)
router.post('/', teamController.createTeam)

export default router
