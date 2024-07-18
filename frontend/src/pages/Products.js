import React from 'react';
import Slider from 'react-slick';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import OurTripsHeader from '../components/OurTripsHeader/OurTripsHeader';
import './Products.css';
import ImgForCard1 from '../assets/slider1.webp';
import ImgForCard2 from '../assets/slider2.webp';
import ImgForCard3 from '../assets/slider3.webp';
import ImgForCard4 from '../assets/slider4.webp';
import marsaalamimg from '../assets/hurghada.webp'
import gizaimg from '../assets/Visit the Great Pyramids of Giza without a tour - 5 things you need to know - Sun Chasing Travelers.jpeg'
import luxorimg from '../assets/2 Day Trips from Marsa Alam to Luxor _ Luxor Tours from Marsa Alam.jpeg'
import hurgadaimg from '../assets/Hôtel de luxe à Hurghada, Égypte (2).jpeg'
import cairoimg from '../assets/pexels-ahmed-aziz-126288236-12607743.jpg'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const TopSights = () => {
  const sights = [
    { name: 'Statue of Liberty', activities: 161, image: ImgForCard1 },
    { name: 'Vatican Museums', activities: 434, image: ImgForCard3 },
    { name: 'Eiffel Tower', activities: 518, image: ImgForCard2 },
    { name: 'Metropolitan Museum of Art', activities: 46, image: ImgForCard4 },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="top-sights Container2 ProductsPageContainer">
      <h2>Top cultural sights you can't miss</h2>
      <Slider {...settings}>
        {sights.map((sight, index) => (
          <div key={index} className="sight-card">
            <img src={sight.image} alt={sight.name} />
            <h4>{index + 1}. {sight.name}</h4>
            <p>{sight.activities} activities</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const AwesomeDestinations = () => {
  const destinations = [
    { name: 'Hurgada', image: hurgadaimg, locationlink: '/ouroffers/Hurgada' },
    { name: 'Marsa Alam', image: marsaalamimg, locationlink: '/ouroffers/MarsaAlam' },
    { name: 'Cairo', image: cairoimg, locationlink: '/ouroffers/Cairo' },
    { name: 'Giza', image: gizaimg, locationlink: '/ouroffers/Giza' },
    { name: 'Luxor', image: luxorimg, locationlink: '/ouroffers/Luxor' },
  ];

  return (
    <div className="awesome-destinations ProductsPageContainer">
      <h2>Awe-inspiring culture around the world</h2>
      <div className="destinations-grid">
        {destinations.map((destination, index) => (
          <Link key={index} to={destination.locationlink}>
            <div className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h4>{destination.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className='AwesomeDestinations'>
      <Navbar />
      <TopSights />
      <AwesomeDestinations />
      <Footer />
    </div>
  );
};

export default App;
