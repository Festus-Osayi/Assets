import { createConnections } from "@/lib/mongoose";
import Stripe from 'stripe'; // stripe modules
import { buffer } from "micro";
import { Orders } from "@/models/orders";
const stripe = new Stripe(process.env.STRIPE_SK); /** include your stripe secret key */

// Use this sample code to handle webhook events in your integration.
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Use this sample code to handle webhook events in your integration
 * 1) Paste this code into a new file
 * 2) Install dependencies
 * npm install stripe
 * 3) Run the server on http://localhost:4242
 * from stripe documentation
 */
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_d3a1066b3838c37bc12dcefe9a43c8e330dc04e938f4e48d619479e4bd8c8127";
export default async function handler(req, res) {
    await createConnections()
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;

            /** check if the payment status is paid,
             * Then define and call a function to handle the event 
             * payment_intent.succeeded
             * and update our database with the following returned.... 
             * */
            const orderId = data.metadata.orderId
            const paid = data.payment_status === 'paid'
            if (orderId && paid) {
                await Orders.findByIdAndUpdate(orderId, {
                    isPaid: true
                })
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send('ok');
}

export const config = {
    api: { bodyParser: false }
}

// fondly-honor-led-bright
// acct_1NhIEEFg6ojfKET4

