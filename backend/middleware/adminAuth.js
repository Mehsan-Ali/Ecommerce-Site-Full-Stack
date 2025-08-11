import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(' ')[1]

        if (!token) return res.status(400).json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: "You are not an admin"});
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

export default adminAuth