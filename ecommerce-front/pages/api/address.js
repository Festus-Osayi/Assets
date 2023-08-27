import { createConnections } from "@/lib/mongoose"
import { Address } from "@/models/address"
import { getServerSession } from 'next-auth'
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    await createConnections()

    const session = getServerSession(req, res, authOptions)
    const address = await Address.findOne({ userEmail: session?.user?.email })
    if (req.method === 'PUT') {

        if (address) {
            res.json(await Address.findByIdAndUpdate(address._id, req.body))
        } else {
            res.json(await Address.create({ userEmail: session?.user?.email, ...req.body }))
        }
    }

    if (req.method === "GET") {
        /** grab the user session */
        // const { user } = getServerSession(req, res, authOptions)
        // const address = await Address.findOne({ userEmail: user?.email })
        res.json(address)
    }



}




