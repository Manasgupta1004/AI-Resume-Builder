import express from 'express'
import { registerUser, loginUser, getUserById, getUserResume } from '../controllers/controller.js'
import protect from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/data', protect, getUserById)
router.get('/resumes', protect, getUserResume)

export default router