import mongoose from "mongoose"
import { Configure } from "./config.js"

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(Configure.MONGO_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`)
        return connection
    } 
    catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`)
        process.exit(1)
    }
}
