import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = 'http://localhost:5173';

const placeOrder = async (req, res) => {
    try {
        // Step 1: Save the order to your database first
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Save the new order to get its ID
        await newOrder.save();

        // Step 2: Map items to Stripe line items format
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',  
                product_data: {
                    name: item.name, 
                },
                unit_amount: item.price * 100,  
            },
            quantity: item.quantity,  
        }));

        // Add delivery charge to line items
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100, // Delivery fee in cents
            },
            quantity: 1,
        });

        // Step 3: Create Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=cancel&orderId=${newOrder._id}`,
            metadata: { orderId: newOrder._id.toString() }, // Convert ObjectId to string
        });

        // Step 4: Respond with the Stripe session URL
        res.json({
            success: true,
            message: 'Order placed, redirect to Stripe checkout',
            sessionUrl: session.url,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Failed to process the order', error: error.message });
    }
};

export default placeOrder;
