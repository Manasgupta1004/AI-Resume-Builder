import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/db.js'
import userRouter from './routes/userroutes.js'
import resumeRouter from './routes/resumeroutes.js'
import aiRouter from './routes/airoutes.js'


const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
await connectDB()


app.get('/', (req, res) => {
    res.send('server is live...')
})
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => [
    console.log(`server is running on port ${PORT}`)
])
