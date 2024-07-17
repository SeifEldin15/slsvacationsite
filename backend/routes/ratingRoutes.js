import express from 'express';

import { getReviews, addReview, getReviewSummary  } from '../controllers/ratingController.js';
 
const router = express.Router();

router.get('/getReviewSummary/:offerId', getReviewSummary);


router.get('/getReviews/:offerId', getReviews);
router.post('/addReview', addReview);


export default router;
