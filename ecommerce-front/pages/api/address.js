import { createConnections } from "@/lib/mongoose"
import { Address } from "@/models/address"
import { getServerSession } from 'next-auth'
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    /** create the database connection */
    await createConnections()

    const session = getServerSession(req, res, authOptions)
    const address = await Address.findOne({ userEmail: session?.user?.email })
    if (req.method === 'PUT') {
        let updateAddress;
        if (address) {
            updateAddress = res.status(200).json(await Address.findByIdAndUpdate(address._id, req.body))
        } else {
            updateAddress = res.status(200).json(await Address.create({ userEmail: session?.user?.email, ...req.body }))
        }

        return res.json(updateAddress)
    }

    if (req.method === "GET") {
        /** grab the user session */
        // const { user } = getServerSession(req, res, authOptions)
        // const address = await Address.findOne({ userEmail: user?.email })
        return res.json(address)
    }



}




