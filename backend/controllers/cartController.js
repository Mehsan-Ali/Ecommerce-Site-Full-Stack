import userModel from "../models/userModel.js"

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData
        const cartKey = `${itemId}_${size}`

        // Add or increment quantity
        if (cartData[cartKey]) {
            cartData[cartKey] += 1
        } else {
            cartData[cartKey] = 1
        }
        // Update user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData })

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cartData
        })
    } catch (error) {
        console.log('Add to cart error:', error)
        return res.status(500).json({
            success: false,
            message: "Server error while adding item to cart"
        })
    }
}
export const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        const cartData = userData.cartData

        const cartKey = `${itemId}_${size}`

        if (quantity === 0) {
            delete cartData[cartKey]
        } else {
            cartData[cartKey] = quantity
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated successfully",
            cartData
        })
    } catch (error) {
        console.log('Update cart quantity error:', error)
        return res.status(500).json({
            success: false,
            message: "Server error while updating cart quantity"
        })
    }
}
export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData
        return res.status(200).json({ success: true, message: "Cart Data", cartData })
    } catch (error) {
        console.log('Get user cart error:', error)
        return res.status(500).json({
            success: false,
            message: "Server error while getting user cart"
        })
    }
}