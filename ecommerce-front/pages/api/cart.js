import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";

/** carts endpoints */
export default async function handler(req, res) {
    await createConnections()
    const ids = await req.body.ids
    res.json(await Product.find({ _id: ids }))
}