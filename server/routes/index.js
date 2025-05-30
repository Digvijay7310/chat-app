import express from 'express'
import { registerUrl } from '../controller/registerUser.controller.js'

const router = express.Router()

//create apis
router.post("/register", registerUrl)


export { router }