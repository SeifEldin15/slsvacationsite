import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OfferCard.css';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const OfferCard = ({ apiEndpoint, wishlistEndpoint }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch products
    axios.get(apiEndpoint)
      .then(response => {
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Fetch wishlist
    axios.get(wishlistEndpoint)
      .then(response => {
        const wishlistData = Array.isArray(response.data) ? response.data : [];
        setWishlist(wishlistData);
        localStorage.setItem('wishlist', JSON.stringify(wishlistData));
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }, [apiEndpoint, wishlistEndpoint]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleAddToWishlist = (productId) => {
    axios.post(wishlistEndpoint, { productId })
      .then(response => {
        console.log(response.data.message);
        let updatedWishlist;
        if (wishlist.includes(productId)) {
          updatedWishlist = wishlist.filter(id => id !== productId);
        } else {
          updatedWishlist = [...wishlist, productId];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      })
      .catch(error => {
        console.error('Error updating wishlist:', error);
      });
  };

  return (
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
     <img src={require(`../media/offers/${product.product_img}`)} alt={product.title} />
   </div>
   <div className="card-info">
     <p className="card-people">
       {product.description}
       <button onClick={() => handleAddToWishlist(product.id)}>
         <i className={wishlist.includes(product.id) ? "fa-solid fa-heart wishlisted" : "fa-regular fa-heart"}></i>
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
  );
};

export default OfferCard;