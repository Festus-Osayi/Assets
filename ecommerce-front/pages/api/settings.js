import { createConnections } from "@/lib/mongoose";
import { Settings } from "@/models/settings";

export default async function handler(req, res) {
    createConnections().then(() => {
        const { method } = req
        switch (method) {
            case 'GET':
                const { name } = req.query
                Settings.findOne({ name }).then((settings) => {
                    if (settings) {
                        res.json(settings)
                    } else {
                        res.status(404).json({ message: 'Settings not found' });
                    }
                }).catch((err) => {
                    console.log('error', err);
                    es.status(500).json({ message: 'Internal server error' })
                })
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
                res.status(401).end(`Method ${method} is not allowed`)
                break;
        }

    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    })

}