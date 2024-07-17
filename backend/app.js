import express from 'express';
import contactRoutes from './routes/productService.js';
import AuthRoutes from './routes/Auth.js';
import productService from './routes/productService.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import adimnRoutes from './routes/adimnRoutes.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
import * as config from './config.js'; 

dotenv.config();

const app = express();
const PORT = config.PORT || 5000; 

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('working');
});

const connection = mysql.createConnection({
  host: config.DB_HOST,  
  user: config.DB_USER,  
  password: config.DB_PASSWORD, 
  database: config.DB_NAME,  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.use(contactRoutes);
app.use(AuthRoutes);
app.use(productService);
app.use(wishlistRoutes);
app.use(ratingRoutes);
app.use(adimnRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
