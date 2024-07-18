import React from 'react'
import UserCart from '../components/UserCart/UserCart'
import Navbar from '../components/Navbar/Navbar'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const CartPage = () => {
  return (
    <>    <PayPalScriptProvider options={{ "client-id": "AdH5vmUafgFMOVW4F7HLyQdjmbknbz14x2JBINrZjlHIyIRkSganen0gj5vkxLYsMMTiI9BBMm12rM-i", currency: "USD" }}>

    <Navbar />
      <UserCart />    </PayPalScriptProvider>

    </>
  )
}

export default CartPage
