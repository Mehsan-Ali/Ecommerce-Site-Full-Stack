import express from 'express'
import "dotenv/config"
import cors from 'cors'
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRoute.js"
import DatabaseConn from './config/mongodb.js'
import ConnectCloudinary from './config/cloudinary.js'
import cookieParser from 'cookie-parser'

const app = express()
//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  // origin: "http://localhost:5174", // frontend origin
  // credentials: true // allow cookies
}));

const PORT = process.env.PORT || 3000

DatabaseConn()
ConnectCloudinary()


app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
    res.send("Hello Api")
})
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
})