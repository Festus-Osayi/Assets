import { createConnections } from "@/lib/mongoose";
import { Settings } from "@/models/settings";

export default async function handler(req, res) {
    createConnections()
    const { method } = req
    switch (method) {
        case 'GET':
            const { name } = req.query
            res.json(await Settings.findOne({ name }))
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(401).end(`Method ${method} is not allowed`)
            break;
    }
}