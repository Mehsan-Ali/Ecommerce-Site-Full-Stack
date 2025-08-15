import express from 'express'
import { addToCart, getUserCart, removeCart, updateCart } from '../controllers/cartController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/get', verifyUser, getUserCart)
router.post('/add', verifyUser, addToCart)  
router.post('/update', verifyUser, updateCart)
router.delete('/remove', verifyUser, removeCart)

export default router