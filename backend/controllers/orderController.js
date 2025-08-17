import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// -------------- Only Cash on Delivery Order --------------
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date: Date.now(),
        }
        const order = new orderModel(orderData)
        await order.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        await userModel.findByIdAndUpdate({ _id: userId }, { $push: { orders: order } }).exec()
        res.status(200).json({ success: true, message: "Order Placed Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error || "Something went wrong in placing order" })
    }
}

// ---------- Only Stripe Order ------------
export const placeOrderStrip = (req, res) => {
    try {

    } catch (error) {

    }
}

// ---------- Only Razor pay Order ------------
export const placeOrderRazorpay = (req, res) => {
    try {

    } catch (error) {

    }
}

// ---------- All Orders ------------
export const allOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({})
        res.status(200).json({ success: true, message: "All Orders", allOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }   
}

// ---------- User Orders ------------
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const userOrders = await orderModel.find({ userId })
        res.status(200).json({ success: true, message: "User Orders", userOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

// ---------- Update Status User Orders from Admin Only ------------
export const updateStatusOrder = async (req, res) => {
    try {
        const { orderId, status } = req.body
        const order = await orderModel.findById(orderId)
        if(!order) return res.status(404).json({ success: false, message: "Order not found" })
        order.status = status
        await order.save()
        res.status(200).json({ success: true, message: "Order Status Updated Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}