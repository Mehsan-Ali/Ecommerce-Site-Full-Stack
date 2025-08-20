import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const currency = "inr"
const deliveryCharge = 10
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
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
            payment: false,
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
export const placeOrderStrip = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers // Client side Url 
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: {
                    name: item.title,
                },
                unit_amount: Math.round(item.itemPrice * 100),
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        })

        res.status(200).json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
// ---------- Verify Stripe Order ------------
export const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({ success: true, message: "Payment Success" })
            // const order = await orderModel.findById(orderId)
            // order.payment = true
            // await order.save()
            // await userModel.findByIdAndUpdate(userId, { $push: { orders: order } }).exec()
        }else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
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
        if (!order) return res.status(404).json({ success: false, message: "Order not found" })
        order.status = status
        await order.save()
        res.status(200).json({ success: true, message: "Order Status Updated Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}