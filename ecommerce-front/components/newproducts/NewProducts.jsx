import styled from "styled-components";
import Center from "../center/Center";
import ProductsCards from "../productscards/ProductsCards";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin: 30px 0 20px;
`
export default function NewProducts({ products }) {
  return (
    <Center>
      <h2>New Arrivals</h2>
      <ProductGrid>
        {products.length > 0 &&
          products.map((product) => (
            /** map through all the new products
             *  and render them with the products card
             * components *
             */
            <ProductsCards {...product} key={product._id} />
          ))}
      </ProductGrid>
    </Center>
  );
}
