import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB.js'
import { router } from './routes/index.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send('Hello world!')
})

//apis endpoints
app.use('/api', router)
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at ${PORT}`)
        })

    })
    .catch((error) => {
        console.log('MongoDB is not connected', error)
    })

