import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/get', verifyUser, getUserCart)
router.post('/add', verifyUser, addToCart)
router.post('/update', verifyUser, updateCart)

export default router