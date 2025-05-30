import express from 'express'
import { registerUrl } from '../controller/registerUser.controller.js'
import { checkEmail } from '../controller/checkEmail.controller.js'
import { checkPassword } from '../controller/checkPassword.controller.js'
import { userDetails } from '../controller/userDetail.controller.js'
import { logout } from '../controller/logout.controller.js'
import { updateUserDetails } from '../controller/updateUserDetails.controller.js'

const router = express.Router()

//create apis
router.post("/register", registerUrl)
//check user email
router.post("/email", checkEmail)
//check user password
router.post("/password", checkPassword)
//login user detail
router.get("/user-details", userDetails)
///logout user
router.get("/logout", logout)
//update uesr detail
router.patch("/update-user", updateUserDetails)


export { router }