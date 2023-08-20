import styled from "styled-components";
import Buttons from "../buttons/Buttons";
import Cart from "../icons/CartIcons";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ProductWrapper = styled.div``;
const ProductDetails = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const ProductCardImages = styled.img`
  max-width: 100%;
  max-height: 80px;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const ProductCardInfo = styled.div`
  margin-top: 5px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;
export default function ProductsCards({
  images,
  _id,
  title,
  description,
  price,
}) {
  /** application states */
  const { addToProducts } = useContext(CartContext);
  /** Products Cards */
  return (
    <ProductWrapper>
      <ProductDetails href={`/products/${_id}`}>
        <div>
          <ProductCardImages src={images} alt={title} />
        </div>
      </ProductDetails>
      <ProductCardInfo>
        <Title href={`/products/${_id}`}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Buttons primary={true} outline onClick={() => addToProducts(_id)}>
            <Cart />
            Add to cart
          </Buttons>
        </PriceRow>
      </ProductCardInfo>
    </ProductWrapper>
  );
}
