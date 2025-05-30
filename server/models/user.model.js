import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password must be required"],
    },
    profile_pic: {
        type: String,
        default: ""
    }

},
    {
        timestamps: true
    })

const UserModel = mongoose.model("User", userSchema)

export { UserModel }