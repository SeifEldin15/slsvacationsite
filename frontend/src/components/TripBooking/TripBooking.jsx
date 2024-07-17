import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TripBooking.css';

const TripBooking = () => {
  const navigate = useNavigate();
  const tripTypes = [
    'FRIENDS TRIP',
    'HONEYMOON',
    'SOLO TRAVELER',
    'FAMILY TRIP',
    'BUSINESS/ENTITY'
  ];

  const handleTripTypeSelection = (type) => {
    navigate('/TripFormPage', { state: { tripType: type } });
  };

  return (
    <div className="trip-booking">
      <h3>WHO ARE YOU BOOKING THIS TRIP FOR ?</h3>
      {tripTypes.map((type, index) => (
        <button key={index} className="trip-button" onClick={() => handleTripTypeSelection(type)}>
          {type}
        </button>
      ))}
      <a href="/" className="back-link">BACK TO HOMEPAGE</a>
    </div>
  );
};

export default TripBooking;