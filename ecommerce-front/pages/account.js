import Buttons from "@/components/buttons/Buttons";
import Center from "@/components/center/Center";
import Header from "@/components/header/Header";
import { Title } from "@/components/reusable-styles/Title";
import { WhiteBox } from "@/components/reusable-styles/WhiteBox";
import { useSession, signOut, signIn } from "next-auth/react"
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";
import Input from "@/components/input/Input";
import { CityPostalCode } from "./cart";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Spinner from "@/components/spinner/Spinner";
import ProductsCards from "@/components/productscards/ProductsCards";

/** styling */
const ColumnWrapper = styled.div`
display: grid;
grid-template-columns: 1.2fr .8fr;
gap: 30px;
margin: 40px 0;
hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
}
p{
    margin: 5px;
}
`
const WisHListGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
`
export default function AccountPage() {

    const { data: session } = useSession()
    /*************  application states ************/
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [isAddressLoading, setIsAddressLoading] = useState(true)
    const [isWishListLoading, setIsWishListLoading] = useState(true)
    const [wishedList, setWishedList] = useState([])
    /*********************************************/

    /** functionality for logout */
    async function logout() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    /** functionality for login */
    async function handleLogin() {
        await signIn('google')
    }

    /** functionality to save address */
    const saveAddress = async () => {
        const data = {
            name, email,
            city, postalCode,
            streetAddress, province,
            country
        }
        await axios.put('/api/address', data)

    }

    /** fetch all the data on mount */
    useEffect(() => {

        axios.get('/api/address').then((res) => {
            /** check if the user is login or not */
            if (!session) {
                return;
            }
            setIsWishListLoading(false)
            setIsAddressLoading(false)
            /** update the state with response from server */
            setName(res.data.name)
            setEmail(res.data.email)
            setCity(res.data.city)
            setPostalCode(res.data.postalCode)
            setStreetAddress(res.data.streetAddress)
            setProvince(res.data.province)
            setCountry(res.data.country)
            setIsAddressLoading(true)
        })

        axios.get('/api/wishlist').then((res) => {
            setWishedList(res.data.map((wp) => wp.product))
            setIsWishListLoading(true)
        }



        )

    }, [session])

    /** functionality to remove from wishlist */
    const removeWishList = (idToRemove) => {
        setWishedList((prev) => {
            return [...prev.filter((products) => products._id.toString() !== idToRemove)]
        })
    }
    return (
        <>
            <Header />
            <Center>
                <ColumnWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>

                                <h2>Wishlist</h2>
                                {/* map though all the wished list */}
                                {/* check if the user is login or not */}
                                <WisHListGrid>

                                    {
                                        !isWishListLoading && <Spinner fullWidth={true} />
                                    }
                                    {
                                        isWishListLoading && wishedList.length > 0 ? wishedList.map((wp) => (
                                            <ProductsCards key={`${wp._id}`} {...wp} wished={true} onRemoveFromWishList={() => removeWishList(wp._id)} />
                                        ))
                                            : session &&
                                            <p>Your wish list is empty</p>
                                    }

                                </WisHListGrid>
                                {!session && <p>Please login to add product to your wish list.</p>
                                }
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                <h2>{session ? 'Account details' : 'Login'}</h2>
                                {/* shipping info and a preloader*/}
                                {
                                    !isAddressLoading && <Spinner fullWidth={true} />
                                }
                                {
                                    isAddressLoading && session && <>
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
                                                name='postalCode'
                                                onChange={(e) => setPostalCode(e.target.value)} />
                                        </CityPostalCode>
                                        <Input type="text"
                                            placeholder="Street address"
                                            value={streetAddress}
                                            name='streetAddress'
                                            onChange={(e) => setStreetAddress(e.target.value)} />
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
                                            onClick={saveAddress}
                                        >
                                            Save
                                        </Buttons>
                                        <hr />
                                    </>

                                }

                                {/* sessions */}
                                {
                                    session ? (<Buttons primary onClick={logout}>Logout</Buttons>) : (<Buttons primary onClick={handleLogin}>Login with google</Buttons>)
                                }
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColumnWrapper>
            </Center>

        </>
    )
}

