import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    test: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

const conversationSchema = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    recevier: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Message"
        }
    ]
},
    {
        timestamps: true
    })

const messageModel = mongoose.model("Message", messageSchema)
const conversationModel = mongoose.model("Conversation", conversationSchema)

export { conversationModel, messageModel }