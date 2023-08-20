import styled, { createGlobalStyle } from 'styled-components'
import '../styles/global.css'
import CartContextProvider from '@/context/CartContext'
const GlobalStyles = createGlobalStyle`
body{
  margin: 0;
  padding: 0;
  background-color: #eee;
}
  
`
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
          <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
