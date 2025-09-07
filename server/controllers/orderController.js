import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
import stripe from "stripe"


// Global variables for payment
const currency = "pkr"
const deliveryCharges = 10 // 10 dollars
const taxPercentage = 0.02 // 2% tax charges

// Place order using COD = /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body
        const userId = req.userId

        if (items.length === 0) {
            return res.json({ success: false, message: "Please add a Product first" })
        }
        // calculate amount using items
        let subtotal = await items.reduce(async (acc, item) => {
            const product = await productModel.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // calculate total
        const taxAmount = subtotal * taxPercentage
        const totalAmount = subtotal + taxAmount + deliveryCharges

        await orderModel.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "COD"
        })

        // Clear user Cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        return res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Place order using Stripe = /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body
        const userId = req.userId
        const { origin } = req.headers

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Please add a product first" })
        }
        if (!address) {
            return res.status(400).json({ success: false, message: "Delivery address is required" })
        }
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized request" })
        }

        let productData = []
        let subtotal = 0

        for (const item of items) {
            const product = await productModel.findById(item.product)
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.product}` })
            }

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })

            subtotal += product.offerPrice * item.quantity
        }

        const taxAmount = subtotal * taxPercentage
        const totalAmount = subtotal + taxAmount + deliveryCharges

        // Save order as unpaid first
        let order
        try {
            order = await orderModel.create({
                userId,
                items,
                amount: totalAmount,
                address,
                paymentMethod: "stripe",
                isPaid: false
            })
        } catch (dbError) {
            console.error("❌ Failed to create order:", dbError)
            return res.status(500).json({ success: false, message: "Error creating order" })
        }

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        let line_items = productData.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: Math.floor(item.price * 100 * 277)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency,
                product_data: { name: "Tax (2%)" },
                unit_amount: Math.floor(taxAmount * 100 * 277)
            },
            quantity: 1
        })

        line_items.push({
            price_data: {
                currency,
                product_data: { name: "Delivery Charges" },
                unit_amount: Math.floor(deliveryCharges * 100 * 277)
            },
            quantity: 1
        })

        let session
        try {
            session = await stripeInstance.checkout.sessions.create({
                line_items,
                mode: "payment",
                success_url: `${origin}/loader?next=my-orders`,
                cancel_url: `${origin}/cart`,
                metadata: {
                    orderId: order._id.toString(),
                    userId,
                }
            })
        } catch (stripeError) {
            console.error("❌ Stripe session creation failed:", stripeError)
            return res.status(500).json({ success: false, message: "Stripe session creation failed" })
        }

        try {
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
        } catch (cartError) {
            console.warn("⚠️ Failed to clear cart for user:", userId, cartError)
        }

        console.log("✅ Checkout URL created:", session.url)
        return res.json({ success: true, url: session.url })

    } catch (error) {
        console.error("❌ Unexpected error in placeOrderStripe:", error)
        return res.status(500).json({ success: false, message: "Something went wrong, please try again later" })
    }
}

// Stripe Webhooks for verifuing payment through stripe
export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log("stripe secret veifried")
        console.log(event)
    } catch (err) {
        console.log("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("checking event", event.type)
    switch (event.type) {
        case "payment_intent.succeeded": {
            const session = event.data.object;
            console.log(session.metadata);
            const { orderId, userId } = session.metadata;
            await orderModel.findByIdAndUpdate(orderId, { isPaid: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            console.log("Order marked as paid:", orderId);
            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntent.id,
                limit: 1
            });
            if (sessions.data.length) {
                const { orderId } = sessions.data[0].metadata;
                await orderModel.findByIdAndDelete(orderId);
                console.log("Order deleted due to failed payment:", orderId);
            }
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};

// All orders data for frontend bt userId = /api/order/userorders
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId

        const orders = await orderModel.find({
            userId, $or: [
                { paymentMethod: "COD" },
                { paymentMethod: "stripe", isPaid: false }

            ]
        }).populate("items.product").sort({ createdAt: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// All Orders data for Admin panel = /api/order/list
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ $or: [{ paymentMethod: "COD" }, { isPaid: true }] }).populate("items.product").sort({ createdAt: -1 })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// Updating order status from admin panel = /api/order/status
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Order Status Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}