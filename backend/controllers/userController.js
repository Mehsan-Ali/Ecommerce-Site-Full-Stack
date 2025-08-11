import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import validator from 'validator'

const generateJWTToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}
// User Login Controller
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModel.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        const isPasswordHashed = await bcrypt.compare(password, existUser.password)
        if (!isPasswordHashed) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

        const token = generateJWTToken(existUser._id)
        return res.status(200).json({ success: true, message: "User Logged In Successfully", user: existUser, token })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
}

// User Register Controller
export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await userModel.findOne({ email })
        // ---------- Check if user already exists
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }
        // ---------- Validate User Email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }
        // ---------- Validate User Password
        if (password > 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        }
        // ---------- Encrypting User Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // ---------- Create New User
        const newUser = await userModel.create({ name, email, password: hashedPassword })

        // ---------- Create token
        const token = generateJWTToken(newUser._id)
        return res.status(201).json({ success: true, message: "User Registered Successfully", user: newUser, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

// Admin Login Controller
export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY)
            return res.status(200).json({ success: true, message: "Admin Logged In Successfully", token })
        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}