import Buttons from "@/components/buttons/Buttons";
import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/table/Table";
import Input from "@/components/input/Input";

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
`

const CartCard = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 30px;
`
const Images = styled.img`
    max-width: 80px;
    max-height: 80px;
`
const CartInfoCell = styled.td`
    padding: 10px 0;
`
/** image box */
const ProductImageBox = styled.div`
max-width: 100px;
max-height: 100px;
padding: 10px;
border-radius: 10px;
border: 1px solid rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;

`
const QuantityLabel = styled.span`
padding: 0 3px;
`
const CityPostalCode = styled.div`
display: flex;
gap: 5px;
`
export default function Cart() {
    /*************  application states ************/
    const { cartProducts, addToProducts, removeProducts } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    /*********************************************/
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then((res) => setProducts(res.data))
        } else {
            setProducts([])
        }

    }, [cartProducts])

    /** functionality to add more products */
    const moreOfThisProduct = (id) => {
        addToProducts(id)
    }
    /** functionality to remove product */
    const lessOfThisProduct = (id) => {
        removeProducts(id)
    }

    /** calculating the total price 
     * @param total
    */
    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find((p) => p._id === productId)?.price || 0
        total += price
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnWrapper>
                    <CartCard>
                        <h2>Cart</h2>
                        {
                            !cartProducts.length > 0 &&
                            <h2>Your cart is empty</h2>
                        }

                        {/* cart items tables */}
                        {
                            products.length > 0 && (
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((p) => (
                                                /** map through all the 
                                                 * products in the carts and 
                                                 * render them in the table cell
                                                 * 
                                                */
                                                <tr key={p._id}>
                                                    <CartInfoCell>
                                                        <ProductImageBox>
                                                            <Images src={p.images[0]} alt={p.title} />
                                                        </ProductImageBox>
                                                        {p.title}
                                                    </CartInfoCell>
                                                    <td>
                                                        <Buttons onClick={() => lessOfThisProduct(p._id)}>-</Buttons>
                                                        <QuantityLabel>
                                                            {cartProducts.filter(id => id === p._id).length}
                                                        </QuantityLabel>
                                                        <Buttons onClick={() => moreOfThisProduct(p._id)}>+</Buttons>
                                                    </td>
                                                    <td>${cartProducts.filter(id => id === p._id).length * p.price}</td>
                                                </tr>

                                            ))
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>${total}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )


                        }

                    </CartCard>

                    {
                        !!cartProducts?.length > 0 && <CartCard>
                            <h2>Order Information</h2>
                            {/* shipping info and stripe payment action*/}
                            <form method="POST" action="/api/checkout">
                                <Input type="text"
                                    placeholder="Name"
                                    value={name}
                                    name='name'
                                    onChange={(e) => setName(e.target.value)} />
                                <Input type="email"
                                    placeholder="Email"
                                    value={email}
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)} />
                                <CityPostalCode>
                                    <Input type="text"
                                        placeholder="City"
                                        value={city}
                                        name='city'
                                        onChange={(e) => setCity(e.target.value)} />
                                    <Input type="text"
                                        placeholder="Postal code"
                                        value={postalCode}
                                        name='postcode'
                                        onChange={(e) => setPostalCode(e.target.value)} />
                                </CityPostalCode>
                                <Input type="text"
                                    placeholder="Street address"
                                    value={address}
                                    name='address'
                                    onChange={(e) => setAddress(e.target.value)} />
                                <Input type="text"
                                    placeholder="Province City State"
                                    value={province}
                                    name='province'
                                    onChange={(e) => setProvince(e.target.value)} />
                                <Input type="text"
                                    placeholder="Country"
                                    value={country}
                                    name='country'
                                    onChange={(e) => setCountry(e.target.value)} />
                                <Buttons
                                    black
                                    block
                                    type='submit'
                                >
                                    Continue to payment
                                </Buttons>
                            </form>
                        </CartCard>
                    }

                </ColumnWrapper>
            </Center>
        </>
    )
}

