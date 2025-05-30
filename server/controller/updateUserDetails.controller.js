import { getUserDetailsfromToken } from "../helpers/getUserDetailsfromToken.js"
import { UserModel } from "../models/user.model.js";

async function updateUserDetails(req, res) {
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsfromToken(token)

        const { name, profile_pic } = req.body;

        const updatedUser = await UserModel.updateOne({ _id: user._id }, {
            name, profile_pic

        })

        const userInformation = await UserModel.findById(user._id).select("-password")

        return res.json({
            message: "User updated successfully!",
            data: userInformation,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            messaage: error.message || error,
            error: true
        })
    }
}

export { updateUserDetails }