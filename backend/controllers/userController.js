import userModel from "../models/userModel.js"

// User Login Controller
export const LoginUser = async (req, res) => {
    res.json({ msg: "Login Api is Working" })
}

// User Register Controller
export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await userModel.findOne({ email })

        // -------- Check if user already exists
        if (existUser) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        const newUser = await userModel.create(req.body)
        res.status(201).json({ message: "User created successfully", newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

// Admin Login Controller
export const AdminLogin = async (req, res) => {

}