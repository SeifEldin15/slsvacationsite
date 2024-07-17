import mysql from 'mysql';
import * as config from '../config.js';  // Adjust path as necessary

// MySQL connection setup
const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
});

// Connect
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

const getProductsCart = (req, res) => {
  const sessionId = req.cookies.token;
  const sql = `
    SELECT c.*, o.title, o.price, o.description, o.product_img
    FROM carts c
    JOIN offer o ON c.product_id = o.id
    WHERE c.session_id = ?
  `;
  
  db.query(sql, [sessionId], (err, result) => {
    if (err) {
      console.error('Error fetching products from cart:', err);
      res.status(500).send('Error fetching products from cart');
    } else {
      res.json(result);
    }
  });
};

const getProduct = (req, res) => {
  const { offerId } = req.params;
  console.log(offerId);
  const query = 'SELECT * FROM offer WHERE id = ?';
  db.query(query, [offerId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json(results);
  });
};

const getProducts = (req, res) => {
  const sql = 'SELECT * FROM offer';  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    } else {
      res.json(result);
    }
  });
};
const getProductsLocation = (req, res) => {
  const sql = 'SELECT * FROM offer WHERE location = ?';  
  const location = req.query.location;
  console.log('Received location:', location);

  if (!location) {
    return res.status(400).send('Location parameter is missing');
  }

  db.query(sql, [location], (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    } else {
      res.json(results);
    }
  });
};
const addToCart = (req, res) => {
  const { productId, quantity, date } = req.body;
  const sessionId = req.cookies.token; 
  const checkIfExistsQuery = 'SELECT * FROM carts WHERE session_id = ? AND product_id = ? AND cart_date = ?';

  // Check if the product already exists in the cart for the given date
  db.query(checkIfExistsQuery, [sessionId, productId, date], (err, results) => {
    if (err) {
      console.error('Error checking if item exists in cart:', err);
      res.status(500).send('Error checking item in cart');
      return;
    }

    if (results.length > 0) {
      // If product already exists, update the quantity
      const updateQuantityQuery = 'UPDATE carts SET quantity = ? WHERE session_id = ? AND product_id = ? AND cart_date = ?';
      db.query(updateQuantityQuery, [quantity, sessionId, productId, date], (err, updateResult) => {
        if (err) {
          console.error('Error updating quantity in cart:', err);
          res.status(500).send('Error updating quantity in cart');
        } else {
          res.status(200).json({ message: 'Quantity updated in cart' });
        }
      });
    } else {
      // If product does not exist, insert a new row
      const insertQuery = 'INSERT INTO carts (session_id, product_id, quantity, cart_date) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [sessionId, productId, quantity, date], (err, insertResult) => {
        if (err) {
          console.error('Error adding item to cart:', err);
          res.status(500).send('Error adding item to cart');
        } else {
          res.status(201).json({ message: 'Item added to cart' });
        }
      });
    }
  });
};



const getCartCount = (req, res) => {
  const sessionId = req.cookies.token;
  const sql = `
    SELECT session_id, SUM(quantity) AS product_count
    FROM carts
    WHERE session_id = ?
    GROUP BY session_id
  `;
  
  db.query(sql, [sessionId], (err, result) => {
    if (err) {
      console.error('Error fetching cart count:', err);
      res.status(500).send('Error fetching cart count');
    } else {
      res.json(result);
    }
  });
};

const updateCartItem = (req, res) => {
  const { productId, quantity } = req.body;
  const sessionId = req.cookies.token;
  const updateQuery = 'UPDATE carts SET quantity = ? WHERE session_id = ? AND product_id = ?';

  db.query(updateQuery, [quantity, sessionId, productId], (err, result) => {
    if (err) {
      console.error('Error updating quantity in cart:', err);
      return res.status(500).send('Error updating quantity in cart');
    }
    res.status(200).json({ message: 'Quantity updated in cart' });
  });
};

const deleteCartItem = (req, res) => {
  const productId = req.params.productId;
  const sessionId = req.cookies.token;
  const deleteQuery = 'DELETE FROM carts WHERE session_id = ? AND product_id = ?';
  
  console.log('productId', productId);
  console.log('sessionId:', sessionId);

  db.query(deleteQuery, [sessionId, productId], (err, result) => {
    if (err) {
      console.log('Error deleting item from cart:', err);
      return res.status(500).send('Error deleting item from cart');
    }
    res.status(200).json({ message: 'Item deleted from cart' });
  });
};


 export { getProducts, addToCart, getProductsCart, getCartCount, deleteCartItem, updateCartItem, getProduct, getProductsLocation };
