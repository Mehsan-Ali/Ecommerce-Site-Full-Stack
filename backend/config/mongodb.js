import mongoose from "mongoose";

const DatabaseConn = async () => {
    const uri = process.env.MONGODB_URL
    try {
        await mongoose.connect(`${uri}`)
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

export default DatabaseConn