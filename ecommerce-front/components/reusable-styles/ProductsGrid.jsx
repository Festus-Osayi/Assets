import styled from "styled-components";
import ProductsCards from "../productscards/ProductsCards";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export default function ProductsGrid({ products }) {
  return (
    <StyledProductGrid>
      {products.length > 0 &&
        products.map((product) => (
          /** map through all the new products
           *  and render them with the products card
           * components *
           */
          <ProductsCards {...product} key={product._id} />
        ))}
    </StyledProductGrid>
  );
}
