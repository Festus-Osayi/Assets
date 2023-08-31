import { createConnections } from "@/lib/mongoose";
import { Orders } from "@/models/orders";
import { Product } from "@/models/products";
import { getServerSession } from "next-auth";
import Stripe from 'stripe'; // stripe modules
import { authOptions } from "./auth/[...nextauth]";
const stripe = new Stripe(process.env.STRIPE_SK); /** include your stripe secret key */

/** end point for checkout */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json({ message: `Method should be post` })
        return;
    }
    /** get all the formData */
    const {
        name,
        email, city, postalCode,
        streetAddress, province, country,
        cartProducts
    } = req.body

    /** connect to our database (get the unique productIds) */
    await createConnections()
    const productIds = cartProducts
    const uniqueId = [...new Set(productIds)]
    const productsInfos = await Product.find({ _id: uniqueId })

    /** loop through all the  
     * unique Ids
     * get all the products
     * quantity
    */
    const line_items = []
    for (const productsId of uniqueId) {
        const productInfo = productsInfos.find((p) => p._id?.toString() === productsId)
        const quantity = productIds.filter((id) => id === productsId)?.length || 0
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: "CAD",
                    product_data: { name: productInfo?.title },
                    unit_amount: quantity * productInfo?.price * 100
                },

            })
        }

    }
    /** taking the user orders and saving them in the database */
    try {
        /** user session */
        const session = await getServerSession(req, res, authOptions)
        // Create a PaymentIntent with the order amount and currency
        const orderDoc = await Orders.create({
            line_items,
            name,
            email,
            city,
            postalCode,
            streetAddress,
            province,
            country,
            paid: false,
            userEmail: session?.user?.email
        })
        /** adding stripe payment gate way */
        const stripeSession = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
            cancel_url: `${process.env.PUBLIC_URL}/cart?cancel=1`,
            metadata: { orderId: orderDoc._id?.toString() }

        })

        res.json({
            url: stripeSession?.url
        })

    } catch (err) {
        res.json({ message: "error creating an order" })
    }


}

