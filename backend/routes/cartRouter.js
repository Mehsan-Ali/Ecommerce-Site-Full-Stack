import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController'

const router = express.Router()

router.post('/get', getUserCart)
router.post('/add', addToCart)
router.post('/update', updateCart)

export default router