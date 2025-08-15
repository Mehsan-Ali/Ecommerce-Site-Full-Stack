import express from 'express'
import { AdminLogin, LoginUser, RegisterUser, UserData } from '../controllers/userController.js'

const router = express.Router() 

router.post('/register', RegisterUser)
router.get('/user', UserData)
router.post('/login', LoginUser)
router.post('/admin', AdminLogin)

export default router