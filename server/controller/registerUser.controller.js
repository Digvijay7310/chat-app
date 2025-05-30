import { UserModel } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

async function registerUrl(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;

        const checkEmail = await UserModel.findOne({ email })

        if (checkEmail) {
            res.status(400).json({
                message: "Email already register",
                error: true
            })
        }

        // password into hash format

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name, email, profile_pic, password: hashPassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(201).json({
            message: "User created successfully!",
            date: userSave,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export { registerUrl }