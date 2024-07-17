import React from 'react';
import './App.css';
import Home from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Payment from './pages/Payment';
import Paypal from './pages/Paypal';
import TripBookingPage from './pages/TripBooking';
import CallRequests from './pages/ADMIN/CallRequests/CallRequests';
import TripRequests from './pages/ADMIN/TripRequests/TripRequests';

import OurOffers from './pages/OurOffers';
import Offer from './pages/Offer';
import Wishlist from './pages/Wishlist';
import TripFormPage from './pages/TripForm';
import { UserContextProvider } from './contexts/userContext';
import { Toaster } from 'react-hot-toast';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
          <Toaster />

    <UserContextProvider>

    <Routes>
    <Route path="/CallRequests" element={<CallRequests />} />
    <Route path="/TripRequests" element={<TripRequests />} />

        <Route path="/" element={<Home />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Paypal" element={<Paypal />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/TripBookingPage" element={<TripBookingPage />} />
        <Route path="/ouroffers/:offerName" element={<OurOffers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/offer/:productId" element={<Offer />} />
        <Route path="/TripFormPage" element={<TripFormPage />} />
    </Routes>
    </UserContextProvider>
    </>

   );
}

export default App;
//offer card design 
//number of bookings per offer in offer cards
// remove sharm 
// overview video 
//footer links
//guided/private tour
//personalize page add more details.
//trip type
//edit, delete, add offers.
//cart page image edit

//wish list
//offer page like in get your guide 


//addcartcount