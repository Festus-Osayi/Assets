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
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const ProductCardInfo = styled.div`
  margin-top: 5px;
`;

const Price = styled.div`
  font-weight: 400;
  font-size: 1rem;
  text-align: right;
  /** media queries for bigger screen */
  @media screen and (min-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
    text-align: left;
  }
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
          <ProductCardImages src={images?.[0]} alt={title} />
        </div>
      </ProductDetails>
      <ProductCardInfo>
        <Title href={`/products/${_id}`}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Buttons
            block
            primary={true}
            outline
            onClick={() => addToProducts(_id)}
          >
            Add to cart
          </Buttons>
        </PriceRow>
      </ProductCardInfo>
    </ProductWrapper>
  );
}
