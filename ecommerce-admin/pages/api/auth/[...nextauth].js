import clientPromise from '@/lib/mongodb'
import { Admin } from '@/models/admin'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


/** a functionality that checks
 * if the admin email is on
 * the admin database
 */
async function isAdminEmail(email) {
    return !!(await Admin.findOne({ email }))

}
export const authOptions = {
    providers: [
        // OAuth authentication providers with google...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),

    ],
    adapter: MongoDBAdapter(clientPromise),
    /** validating the admin */
    callbacks: {
        session: async ({ session, token, user }) => {
            if (await isAdminEmail(session?.user?.email)) {
                return session
            } else {
                return false
            }
        }
    }


}
export default NextAuth(authOptions)

/** a function to validate if the required email is the admin */
export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res, authOptions)
    /** check if the admin email is the correct email
     * else throw an error...
     */
    if (!(await isAdminEmail(session?.user?.email))) {
        res.status(401)
        res.end()

    }
}