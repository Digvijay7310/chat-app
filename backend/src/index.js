import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js'
import messageRoute from './routes/message.route.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes)
app.use('/api/message', messageRoute)

app.listen(PORT, () => {
    console.log('Server is running on: ', PORT)
    connectDB()
})

