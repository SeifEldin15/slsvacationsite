import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import OfferSection from '../components/OfferSection/OfferSection'
import { Link } from 'react-router-dom';
import axios from 'axios';

import './OurOffers.css'

const OurOffers = () => {
    const [cartCount, setCartCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const { offerName } = useParams();

    const apiEndpoint = 'http://localhost:5000/getProductsLocation';

    const incrementCartCount = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
      axios.get(`${apiEndpoint}?location=${offerName}`)
          .then(response => {
              setProducts(Array.isArray(response.data) ? response.data : []);
          })
          .catch(error => {
              console.error('Error fetching products:', error);
          });
  }, [apiEndpoint, offerName]);

    const toggleWishlist = (productId) => {
        setWishlist(prevWishlist => 
            prevWishlist.includes(productId) 
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId]
        );
    };

    return (
        <div className='OurOffersContainer'>
            <Navbar cartCount={cartCount} />

            <div className='OfferSection Container2 Container'>
                <div className='OfferCards-Container Container2'>
                    {products.map((product) => (
                        <div className="OfferCard" key={product.product_id}>
                            <div className="hover-overlay">
                                <Link to={`/offer/${product.product_id}`} className='cart-button'>
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
                                    <button onClick={() => toggleWishlist(product.id)}>
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
            </div>

            <Footer />
        </div>
    )
}

export default OurOffers