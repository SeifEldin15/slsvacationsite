import express from 'express';
import contactRoutes from './routes/productService.js';
import AuthRoutes from './routes/Auth.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import path, { dirname } from 'path';
import adimnRoutes from './routes/adimnRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
import * as config from './config.js'; 
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = config.PORT || 5000; 

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'frontend', 'build')))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
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
app.use(wishlistRoutes);
app.use(ratingRoutes);
app.use(adimnRoutes);

const generateAccessToken = async () => {
  try {
    if (!config.CLIENT_ID || !config.CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      config.CLIENT_ID + ":" + config.CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${config.BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return {
      jsonResponse: await response.json(),
      httpStatusCode: response.status,
    };
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
const createOrder = async (cart) => {
  console.log("shopping cart information:", cart);

  const accessToken = await generateAccessToken();
  const url = `${config.BASE_URL}/v2/checkout/orders`;

  const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount,
        },
        description: "Purchase from Your Store Name",
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

app.post("/api/orders", async (req, res) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    console.log('Error details:', error.message);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const accessToken = await generateAccessToken();
    const url = `${config.BASE_URL}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await handleResponse(response);
    
    if (data.jsonResponse.status === 'COMPLETED') {
      console.log('PayPal API response:', JSON.stringify(data, null, 2));
      return res.json(data.jsonResponse);
    } else {
      console.log('PayPal API response:', JSON.stringify(data, null, 2));
      return res.status(400).json({ error: 'Payment not completed' });
    }
  } catch (error) {
    console.error("Failed to capture order:", error);
    console.log('Error details:', error.message);
    return res.status(500).json({ error: "Failed to capture order." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});