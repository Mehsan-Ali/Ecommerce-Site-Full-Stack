import express from 'express'
import { addProduct, listProducts, singleProduct, removeProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
const router = express.Router()

// router.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)
router.post('/add', adminAuth, upload.array('image', 4), addProduct)
router.post('/remove', adminAuth, removeProduct)
router.post('/product', adminAuth, singleProduct)
router.get('/list', listProducts)

export default router