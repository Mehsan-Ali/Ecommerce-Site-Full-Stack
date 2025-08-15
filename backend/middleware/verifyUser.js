import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(' ')[1]

        if (!token) return res.status(400).json({ success: false, message: "No token provided" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) return res.status(400).json({ success: false, message: "Invalid Token" })
        req.body.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}