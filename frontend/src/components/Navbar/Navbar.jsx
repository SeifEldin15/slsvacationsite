import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import Cart from '../Cart/Cart';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className='nav-container'>
        <Logo />
        <div className={`links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/Products">
            <a href="#">Our Offers</a>
          </Link>
          <Link to="/TripBookingPage">
            <a href="#">Personalize your trip</a>
          </Link>
          <Link to="/ContactPage">
            <a href="#">Request a call</a>
          </Link>
          <Link to="/wishlist">
            <a href="#">Wishlist</a>
          </Link>
        </div>
        <Cart />
        <div className="burger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;