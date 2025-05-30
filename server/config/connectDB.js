import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOODB_URI)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('connected to db')
        })

        connection.on("error", (error) => {
            console.log('Something is wrong in mongodb', error)
        })

    } catch (error) {
        console.log("Something is wrong while connecting mongoDB", error)
    }
}

export { connectDB }