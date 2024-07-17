import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
axios.defaults.withCredentials = true;

const Cart = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProductsCountCart');
        if (response.data.length > 0) {
          const productCount = response.data[0].product_count;
          setCartCount(productCount);
          console.log(productCount); // Verify if productCount is correctly accessed
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount(); // Call fetchCartCount() when the component mounts

  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <Link to="/cartpage" className='cart-button'>
      <span className="cart-icon">
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="cart-count">{cartCount}</span>
      </span>
      <span className="cart-text">Cart</span>
    </Link>
  );
}

export default Cart;
