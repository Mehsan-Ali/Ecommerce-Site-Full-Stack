import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStrip, updateStatusOrder, userOrders, verifyStripe } from '../controllers/orderController.js'
import { verifyUser } from '../middleware/verifyUser.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()
// Admin Features
router.get('/list', adminAuth, allOrders)
router.patch('/status', adminAuth, updateStatusOrder)

// Payment Features
router.post('/place', verifyUser, placeOrder)
router.post('/stripe', verifyUser, placeOrderStrip)
router.post('/razorpay', verifyUser, placeOrderRazorpay)

// User Feature
router.post('/user-orders', verifyUser, userOrders)

// verify payment
router.post('/verifyStripe', verifyUser, verifyStripe)

export default router