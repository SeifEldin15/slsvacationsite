import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import OfferSection from '../components/OfferSection/OfferSection'
import Overview from '../components/Overview/Overview'
import Footer from '../components/Footer/Footer'
import Carousel from '../components/Carousel/Carousel'
import DropdownQnA from '../components/Dropdown/Dropdown'
import pic1 from '../assets/test1.jpg'
import pic2 from '../assets/yacht-parking-with-tourists-near-white-island-in-red-sea-egypt-free-photo.jpg'
import pic3 from '../assets/PXL_20211105_094814470.jpg'

const Home = () => {
  const images = [pic1, pic2, pic3];

  return (
    <>
      <Navbar />
      <Hero />
      <Overview />
      <Carousel images={images} />
      <OfferSection
        apiEndpoint="http://localhost:5000/products"
        wishlistEndpoint="http://localhost:5000/addToWishlist"
      />
      <DropdownQnA />
      <Footer />
    </>
  )
}

export default Home