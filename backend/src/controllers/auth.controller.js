import cloudinary from "../lib/cloudinary.js";
import { genereateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            res.status(400).json({ message: "FullName, email and password is required and Password must be atleast 6 character long" })
        }
        //hash password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 character long" })
        }

        const user = await User.findOne({ email })
        if (user) return res.send(400).json({ message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser) {
            // genereate jwt token
            genereateToken(newUser._id, res)
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
        console.log(newUser)
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) return res.status(404).json("User not exist with this email address")

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        genereateToken(user.id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
        console.log(user)
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout successfully!" })

    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profiel pic is required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log('Error in update Profile', error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}