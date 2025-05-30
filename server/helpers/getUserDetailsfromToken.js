import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
const getUserDetailsfromToken = async (token) => {
    if (!token) {
        return {
            message: "session out",
            logout: true,

        }
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await UserModel.findById(decode.id).select("-password")

    return user

}

export { getUserDetailsfromToken }