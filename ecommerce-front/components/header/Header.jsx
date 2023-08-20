import Link from "next/link";
import styled from "styled-components";
import Center from "../center/Center";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

/** style components */
const StyleHeader = styled.header`
  background-color: #283046;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Accounts</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
}
