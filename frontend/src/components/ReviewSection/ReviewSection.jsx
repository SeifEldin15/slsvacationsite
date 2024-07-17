import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewSection.css';

const ReviewSection = () => {
  const { productId: offerId } = useParams();
    console.log(offerId);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, reviewText: '' });
  useEffect(() => {
    console.log('Fetching reviews for offerId:', offerId);
    axios.get(`http://localhost:5000/getReviews/${offerId}`)
      .then(response => {
        console.log('Received reviews:', response.data);
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [offerId]);
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/addReview', {
      offerId,
      userId: 1,
      rating: newReview.rating,
      reviewText: newReview.reviewText
    })
      .then(response => {
        console.log(response.data.message);
        setReviews([...reviews, { ...newReview, review_date: new Date() }]);
        setNewReview({ rating: 0, reviewText: '' });
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="review-section-container">
      <div className="review-section">
        <div className="filter-section">
          <p className='Bystarrating'>By star rating</p>
          <div className="star-filter">
            <label>
              <input className='custom-checkbox' type="checkbox" checked /> All star ratings
            </label>
            {[5, 4, 3, 2, 1].map(stars => (
              <label key={stars}>
                <input type="checkbox" className='custom-checkbox' /> {stars} stars 
                <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="reviews-offer-container">
          {reviews.map((review) => (
            <div className="review" key={review.id}>
              <div className="review-header">
                <span className="avatar">G</span>
                <div className="review-info">
                  <div className='SLStraveler'>User {review.username}</div>
                  <div className='SLStravelerDate'>{new Date(review.review_date).toLocaleDateString()} — Verified booking</div>
                </div>
                <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              </div>
              <p>{review.review_text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <form onSubmit={handleReviewSubmit} className="review-form">
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map(stars => (
            <label key={stars}>
              <input
                type="radio"
                name="rating"
                value={stars}
                checked={newReview.rating === stars}
                onChange={() => setNewReview({ ...newReview, rating: stars })}
              /> {stars} stars
            </label>
          ))}
        </div>
        <textarea
          value={newReview.reviewText}
          onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
          placeholder="Write your review here..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <button className="see-more">See more reviews</button> */}
    </div>
  );
};

export default ReviewSection;
