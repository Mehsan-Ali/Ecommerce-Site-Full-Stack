import express from 'express'
import { AdminLogin, LoginUser, RegisterUser } from '../controllers/userController.js'

const router = express.Router() 

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.post('/admin', AdminLogin)

export default router