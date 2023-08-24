import Center from "@/components/center/Center";
import ProductsGrid from "@/components/reusable-styles/ProductsGrid";
import Header from "@/components/header/Header";
import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { Title } from "@/components/reusable-styles/Title";


export default function ProductsPage({ products }) {
    return (
        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    )
}

export const getServerSideProps = async () => {
    // fetch all the data needed for this page and pass it to our props object as a prop called 'products'
    await createConnections()
    const products = await Product.find({}, null, { sort: { '_id': -1 } })
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

