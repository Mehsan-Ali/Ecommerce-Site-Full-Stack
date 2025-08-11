import express from 'express'
import { addProduct, listProducts, singleProduct, removeProduct } from '../controllers/productController.js'
const router = express.Router()

router.post('/add',addProduct)
router.post('/remove',removeProduct)
router.post('/product',singleProduct)
router.get('/list',listProducts)

export default router