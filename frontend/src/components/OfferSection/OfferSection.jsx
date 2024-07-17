import React from 'react'
import './OfferSection.css'
import OfferCard from '../OfferCard/OfferCard'
import OurTripsHeader from '../OurTripsHeader/OurTripsHeader'

const OfferSection = ({ apiEndpoint, wishlistEndpoint }) => {
  return (
    <div className='OfferSection Container2 Container'>
      <OurTripsHeader />
      <OfferCard
        apiEndpoint={apiEndpoint}
        wishlistEndpoint={wishlistEndpoint}
      />
    </div>
  )
}

export default OfferSection