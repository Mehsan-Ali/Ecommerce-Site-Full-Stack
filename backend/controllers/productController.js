import { v2 as cloudinary } from 'cloudinary'
import ProductModel from '../models/productModel.js'

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            bestSeller: Boolean(bestSeller),
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        const product = new ProductModel(productData)
        const savedProduct = await product.save()
        console.log(savedProduct)
        res.json({ success: true, message: "Product Added Successfully", savedProduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

export const listProducts = async (req, res) => {
    try {
        const allProduct = await ProductModel.find({})
        res.json({ success: true, message: "All Products", allProduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body
        const deletedProduct = await ProductModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Product Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const porduct = await ProductModel.findById(productId)
        res.status(200).json({ success: true, message: "Product Found", porduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}