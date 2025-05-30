import { UserModel } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            })
        }

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Please check the password",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const cookiesOption = {
            httpOnly: true,
            secure: true
        }

        return res.cookie('token', token, cookiesOption).status(200).json({
            message: "Login Successfully",
            token: token,
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true
        })
    }
}



export { checkPassword }