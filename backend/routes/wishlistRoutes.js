import express from 'express';
import { addToWishlist, getUserWishlist } from '../controllers/Wishlist.js';

const router = express.Router();

router.post('/addToWishlist', addToWishlist);
router.get('/getUserWishlist', getUserWishlist);
export default router;
