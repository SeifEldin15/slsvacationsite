import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TourComponent.css';
import ReserveDate from '../ReserveDate/ReserveDate';

const TourComponent = () => {
  const [offer, setOffer] = useState(null);
  const { productId: offerId } = useParams();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getProduct/${offerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch offer');
        }
        const data = await response.json();
        setOffer(data[0]);
      } catch (error) {
        console.error('Error fetching offer:', error);
      }
    };

    fetchOffer();
  }, [offerId]);

  if (!offer) {
    return <div>Loading...</div>;
  }

  const handleGetOfferClick = () => {
    window.scrollBy({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="about-activity">
          <p className="description">
            From serene ranks of giant redwoods to the quiet lapping of water on the shore, see all the highlights of the northern San Francisco Bay on this time-saving tour.
          </p>
          <h3 className="activity-title">About this activity</h3>
          <div className="activity-item">
            <i className="fa-regular fa-circle-check"></i>
            <div>
              <div className="item-title">Free cancellation</div>
              <p className="item-description">Cancel up to 24 hours in advance for a full refund</p>
            </div>
          </div>
          <div className="activity-item">
            <i className="fa-regular fa-credit-card"></i>
            <div>
              <div className="item-title">Reserve now & pay later</div>
              <p className="item-description">Keep your travel plans flexible — book your spot and pay nothing today.</p>
            </div>
          </div>
          <div className="activity-item">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <div>
              <div className="item-title">Duration 5 hours</div>
              <p className="item-description">Check availability to see starting times.</p>
            </div>
          </div>
          <div className="activity-item">
            <i className="fa-regular fa-user"></i>
            <div>
              <div className="item-title">Live tour guide</div>
              <p className="item-description">English</p>
            </div>
          </div>
        </div>
        <div className="Tour-Component-Sidebar">
          <div className="sell-out-alert">Likely to sell out</div>
          <div className='sidebar-content'>
            <div>
              <p>From</p>
              <div className="price">£{offer.price}</div>
              <p>per person</p>
            </div>
            <button className="check-availability" onClick={handleGetOfferClick}>Get Offer</button>
          </div>
          <div className='reserve-info'>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2 6a3 3 0 0 1 3-3h12.75a3 3 0 0 1 3 3v4.858a7.007 7.007 0 0 0-2-1.297v-.936H4V15a1 1 0 0 0 1 1h4c0 .695.101 1.366.29 2H5a3 3 0 0 1-3-3V6Zm3-1h12.75a1 1 0 0 1 1 1v.625H4V6a1 1 0 0 1 1-1Z" fill="currentColor"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 16a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm1 5.586V13h-2v3.414l2.293 2.293 1.414-1.414L17 15.586Z" fill="#0071EB"></path>
            </svg>
            <p>Reserve & pay now to book your spot today!</p>
          </div>
        </div>
      </div>
      <ReserveDate />
    </div>
  );
};

export default TourComponent;
