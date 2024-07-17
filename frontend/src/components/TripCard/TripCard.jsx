import React, { useState, useEffect } from 'react';import { useParams } from 'react-router-dom';

import './TripCard.css';
const TripCard = ({  }) => {
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

  return (
    <div className='trip-card-container'>
      <div className="trip-card">
        <p className='trip-card-header'>{offer.title}</p>
        <div className='trip-card-images'>
          <div className='trip-card-images-left'>
            <button className="trip-card-btn view-all">
              View all 9 images
            </button>
            <img src={require(`../media/offers/${offer.product_img}`)} alt="Main offer" />
          </div>
          <div className='trip-card-images-right'>
            <button className="trip-card-btn favorite-btn">
              Add to wishlist <i className="fa-regular fa-heart"></i>
            </button>
            <div className='trip-card-images-right-top'>
              <img src={require(`../media/offers/${offer.product_img}`)} alt="Offer 2" />
              <img src={require(`../media/offers/${offer.product_img}`)} alt="Offer 3" />
            </div>
            <div className='trip-card-images-right-bottom'>
              <img src={require(`../media/offers/${offer.product_img}`)} alt="Offer 1 again" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;