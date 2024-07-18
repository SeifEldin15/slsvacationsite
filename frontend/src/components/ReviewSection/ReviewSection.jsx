import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import './ReviewSection.css';

const ReviewSection = () => {
  const { productId: offerId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, reviewText: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReviews = (page) => {
    console.log('Fetching reviews for offerId:', offerId);
    axios.get(`http://localhost:5000/getReviews/${offerId}?page=${page}`)
      .then(response => {
        console.log('Received reviews:', response.data);
        setReviews(prevReviews => [...prevReviews, ...response.data.reviews]);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to fetch reviews. Please try again later.');
      });
  };

  useEffect(() => {
    fetchReviews(1);
  }, [offerId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (newReview.rating === 0) {
      toast.error('Please select a star rating before submitting.');
      return;
    }

    toast.promise(
      axios.post('http://localhost:5000/addReview', {
        offerId,
        userId: 1,
        rating: newReview.rating,
        reviewText: newReview.reviewText
      }),
      {
        loading: 'Submitting review...',
        success: (response) => {
          setReviews([{ ...newReview, review_date: new Date() }, ...reviews]);
          setNewReview({ rating: 0, reviewText: '' });
          return 'Review submitted successfully!';
        },
        error: 'Failed to submit review. Please try again.'
      }
    );
  };

  const handleSeeMoreReviews = () => {
    if (currentPage < totalPages) {
      fetchReviews(currentPage + 1);
    }
  };

  return (
    <div className="review-section-container">
      <Toaster position="top-center" reverseOrder={false} />
      
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
      
      {currentPage < totalPages && (
        <button className="see-more" onClick={handleSeeMoreReviews}>
          See more reviews
        </button>
      )}

      <form onSubmit={handleReviewSubmit} className="review-form">
        <div className="rating-input">
          {[5, 4, 3, 2, 1].map(stars => (
            <React.Fragment key={stars}>
              <input
                type="radio"
                id={`star${stars}`}
                name="rating"
                value={stars}
                checked={newReview.rating === stars}
                onChange={() => setNewReview({ ...newReview, rating: stars })}
              />
              <label htmlFor={`star${stars}`}>★</label>
            </React.Fragment>
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
    </div>
  );
};

export default ReviewSection;