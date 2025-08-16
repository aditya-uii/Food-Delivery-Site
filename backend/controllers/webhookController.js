import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Store the webhook secret in your environment variables

const webhookController = async (req, res) => {
  const sig = req.headers['stripe-signature']; // Stripe sends the signature in the header

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Check the event type and handle it
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    // Update the order in your database
    await orderModel.findByIdAndUpdate(orderId, { status: 'paid' });

    console.log(`✅ Order ${orderId} marked as paid`);
  }

  res.status(200).json({ received: true });
};

export default webhookController;
