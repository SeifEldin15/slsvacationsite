import React, { useState, useEffect, useCallback} from 'react';
import './Carousel.css';
import CheckOfferBtn from '../CheckOfferBtn/CheckOfferBtn'

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel Container2 ">
  
      <div className="carousel-image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              transition: `transform 0.5s ease-in-out`,
            }}
          />
        ))}
      </div>
 
      <div className="overlay"></div>
      <div className="carousel-info Container">
        <p className='hero-header'>Come visit Egypt</p>
        <p className="hero-header-p">
          Come visit Egypt and enjoy your dream vacation today with competitive prices!
        </p>
        <CheckOfferBtn />
      </div>
    </div>
  );
};

export default Carousel;