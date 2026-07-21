import express from 'express'
import protect from '../middlewares/authmiddleware.js'
import { createResume, deleteResume, updateResume, getResumeById, getPublicResumeById } from '../controllers/resumecontroller.js'
import upload from '../config/multer.js'

const resumerouter = express.Router()

resumerouter.post('/create', protect, createResume)
resumerouter.put('/update', upload.single('image'), protect, updateResume )
resumerouter.delete('delete/:resumeId', protect, deleteResume)
resumerouter.get('/get/:resumeId', protect, getResumeById)
resumerouter.get('/public/:resumeId', getPublicResumeById)

export default resumerouter