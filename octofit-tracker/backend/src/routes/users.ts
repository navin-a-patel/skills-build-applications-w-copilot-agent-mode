import express from 'express'
import { listUsers, createUser } from '../controllers/userController'

const router = express.Router()

// GET /api/users/
router.get('/', listUsers)

// POST /api/users/
router.post('/', createUser)

export default router
