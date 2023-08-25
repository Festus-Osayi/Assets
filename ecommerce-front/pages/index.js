import Featured from "@/components/featured/Featured"
import Header from "@/components/header/Header"
import NewProducts from "@/components/newproducts/NewProducts"
import { createConnections } from "@/lib/mongoose"
import { Product } from "@/models/products"
export default function Home({ featuredProduct, newProduct }) {

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProduct} />
    </div>


  )
}

/** grabbing a product by id, from our database */
export const getServerSideProps = async () => {
  const featuredProductId = '64e504b3003da7a66189ebc9'
  await createConnections()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProduct = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 })
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct))
    }
  }
}

