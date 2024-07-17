import express from 'express';
import mysql from 'mysql';
import * as config from '../config.js';   

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

const addReview = (req, res) => {
    const { offerId,  rating, reviewText } = req.body;
    const sessionId = req.cookies.token;

    const query = 'INSERT INTO reviews (offer_id, session_id, rating, review_text) VALUES (?, ?, ?, ?)';
    db.query(query, [offerId, sessionId, rating, reviewText], (err, result) => {
      if (err) {
        console.error('Error adding review:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Update average rating for the offer
      const updateRatingQuery = `
        UPDATE offers
        SET avg_rating = (SELECT AVG(rating) FROM reviews WHERE offer_id = ?)
        WHERE id = ?;
      `;
      db.query(updateRatingQuery, [offerId, offerId], (err, result) => {
        if (err) {
          console.error('Error updating average rating:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        res.status(200).json({ message: 'Review added and average rating updated' });
      });
    });
  };
 



const getReviews = (req, res) => {
    const { offerId } = req.params;
    console.log(offerId);
    const query = 'SELECT * FROM reviews WHERE offer_id = ?';
    db.query(query, [offerId], (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      res.status(200).json(results);
    });
  };


 
  const getReviewSummary = (req, res) => {
    const { offerId } = req.params;
    
    const query = `
      SELECT 
        AVG(rating) as overallRating,
        COUNT(*) as totalReviews
      FROM reviews
      WHERE offer_id = ?
    `;
    
    db.query(query, [offerId], (err, results) => {
      if (err) {
        console.error('Error fetching review summary:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      const summary = results[0];
      const reviewData = {
        overallRating: summary.overallRating || 0,
        totalReviews: summary.totalReviews || 0,
      };
  
      res.status(200).json(reviewData);
    });
  };
  

export { getReviews, addReview, getReviewSummary  };
