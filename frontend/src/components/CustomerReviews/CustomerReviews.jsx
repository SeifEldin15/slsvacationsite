import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CustomerReviews.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const CustomerReviews = () => {
  const { productId: offerId } = useParams();
  const [reviewData, setReviewData] = useState({
    overallRating: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/getReviewSummary/${offerId}`)
      .then(response => {
        setReviewData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching review summary:', error);
        setError('Failed to load review data');
        setLoading(false);
      });
  }, [offerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="customer-reviews">
      <p className='customer-reviews-header'>Customer reviews <span className="info-icon">ⓘ</span></p>
      <div className="customer-reviews-content">
        <div className="review-summary">
          <div className="overall-rating">
            <p className='customer-reviews-p'>Overall rating</p>
            <div className="rating-large">{reviewData.overallRating.toFixed(1)}<span>/5</span></div>
            <StarRating rating={Math.round(reviewData.overallRating)} />
            <p className='basedon'>based on {reviewData.totalReviews} reviews</p>
          </div>
          
          <div className="category-ratings">
            <p className='customer-reviews-p'>Review summary</p>
            <div className="category">
              <span className="category-name">Rating</span>
              <div className="rating-bar">
                <div
                  className="rating-fill"
                  style={{ width: `${(reviewData.overallRating / 5) * 100}%` }}
                ></div>
              </div>
              <span className="category-rating"><b>{reviewData.overallRating.toFixed(1)}/5</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;