import mongoose from "mongoose"

export const connectToMongoDB = async () => {
    try {
        if (!process.env.MONGODB_URI) throw new Error("'MONGODB_URI' missing")

        const connected = await mongoose.connect(process.env.MONGODB_URI)

        if (!connected) throw new Error("Connection Failed")

        console.log("Connected to MongoDb")
    } catch (error) {
        throw new Error("Failed to Connect to Mongodb:", error)
    }
}
