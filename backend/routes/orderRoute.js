import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStrip, updateStatusOrder, userOrders } from '../controllers/orderController.js'
import { verifyUser } from '../middleware/verifyUser.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()
// Admin Features
router.get('/list',allOrders)
router.patch('/status', updateStatusOrder)

// Payment Features
router.post('/place',verifyUser, placeOrder)
router.post('/stripe',verifyUser, placeOrderStrip)
router.post('/razorpay',verifyUser, placeOrderRazorpay)

// User Feature
router.post('/user-orders',verifyUser, userOrders)

export default router