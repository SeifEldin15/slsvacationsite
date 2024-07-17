import express from 'express';

import {getProductsLocation, getProducts, getProduct, addToCart, getProductsCart, getCartCount, updateCartItem, deleteCartItem } from '../controllers/productService.js';
import { submitCall, submitTripForm } from '../controllers/contactController.js';

const router = express.Router();

router.get('/getProduct/:offerId', getProduct);
router.get('/getProductsLocation', getProductsLocation);


router.get('/products', getProducts);
router.get('/getProductsCart', getProductsCart);
router.post('/addToCart', addToCart);
router.post('/submitCall', submitCall);
router.delete('/deleteCartItem/:productId', deleteCartItem);
router.post('/updateCartItem', updateCartItem);
router.post('/submitTripForm', submitTripForm);
router.get('/getProductsCountCart', getCartCount);

export default router;
