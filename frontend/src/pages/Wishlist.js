import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferCard.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

axios.defaults.withCredentials = true;

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const apiEndpoint = 'http://localhost:5000/getUserWishlist';
  const wishlistEndpoint = 'http://localhost:5000/addToWishlist'; // Adjust this endpoint as needed

  useEffect(() => {
    // Fetch products (which are already in the user's wishlist)
    axios.get(apiEndpoint)
      .then(response => {
        setProducts(Array.isArray(response.data) ? response.data : []);
        // Set initial wishlist based on fetched products
        setWishlist(Array.isArray(response.data) ? response.data.map(product => product.id) : []);
      })
      .catch(error => {
        console.error('Error fetching wishlist products:', error);
      });
  }, [apiEndpoint]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    axios.post(wishlistEndpoint, { productId })
      .then(response => {
        console.log(response.data.message);
        const updatedWishlist = wishlist.filter(id => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        // Remove the product from the displayed list
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Error updating wishlist:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className='OfferSection Container2 Container'>
        <div className='OfferCards-Container Container2'>
          {products.map((product) => (
            <div className="OfferCard" key={product.id}>
              <div className="hover-overlay">
                <Link to={`/offer/${product.id}`} className='cart-button'>
                  <button className="get-offer-btn">
                    Check offers <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </Link>
              </div>
              <div className="image-container">
                <img src={require(`../components/media/offers/${product.product_img}`)} alt={product.title} />
              </div>
              <div className="card-info">
                <p className="card-people">
                  {product.description}
                  <button onClick={() => handleRemoveFromWishlist(product.id)}>
                    <i className="fa-solid fa-heart wishlisted"></i>
                  </button>
                </p>
                <a href={product.link} className="card-title">{product.title}</a> <br />
                <div className="trip-time">2.5 hours</div>
                <button className="location">{product.location}</button>
                <p className="card-price">From ${product.price}</p>
                <input type="hidden" value={product.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;