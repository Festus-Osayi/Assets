import Featured from "@/components/featured/Featured"
import Header from "@/components/header/Header"
import NewProducts from "@/components/newproducts/NewProducts"
import { createConnections } from "@/lib/mongoose"
import { Product } from "@/models/products"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { WishedProducts } from "@/models/wishedproduct"
import { Settings } from "@/models/settings"
export default function Home({ featuredProduct, newProduct, wishedProducts }) {


  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProduct} wishedProducts={wishedProducts} />
    </div>


  )
}

/** grabbing a product by id, from our database */
export const getServerSideProps = async (context) => {
  const featuredProductBId = await Settings.findOne({ name: 'featuredProductsId' })
  const featuredProductId = featuredProductBId.value
  await createConnections()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProduct = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 })

  /** wished list */
  const session = await getServerSession(context.req, context.res, authOptions)

  const wishedNewProducts = session?.user ?
    await WishedProducts.find(
      {
        userEmail: session?.user.email,
        product: newProduct.map((p) => p._id.toString())
      }) : []

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      wishedProducts: wishedNewProducts.map(i => i.product.toString()),
    }
  }
}

