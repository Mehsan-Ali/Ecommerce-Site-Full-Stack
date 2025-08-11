import express from 'express'
import "dotenv/config"
import cors from 'cors'
import userRouter from "./routes/userRoute.js"
import DatabaseConn from './config/mongodb.js'
import ConnectCloudinary from './config/cloudinary.js'
import cookieParser from 'cookie-parser'

const app = express()
//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors())

const PORT = process.env.PORT || 3000

DatabaseConn()
ConnectCloudinary()


app.use('/api/user', userRouter)

app.get("/", (req, res) => {
    res.send("Hello Api")
})
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})