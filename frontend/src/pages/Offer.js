import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import TripCard from '../components/TripCard/TripCard'
import TourComponent from '../components/TourComponent/TourComponent'
import ExperienceCard from '../components/ExperienceCard/ExperienceCard'
import CustomerReviews from '../components/CustomerReviews/CustomerReviews'
import ReviewSection from '../components/ReviewSection/ReviewSection'

const Offer = () => {
    const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <TripCard />
      <TourComponent />
      <ExperienceCard />
      <CustomerReviews />
      <ReviewSection />
      <Footer />
    </>
  )
}

export default Offer
