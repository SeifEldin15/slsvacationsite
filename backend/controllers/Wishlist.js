import mysql from 'mysql';
import * as config from '../config.js';   

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

const addToWishlist = (req, res) => {
  const sessionId = req.cookies.token;
  const { productId } = req.body;

  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if the item is already in the wishlist
  const checkQuery = 'SELECT * FROM wishlist WHERE session_id = ? AND product_id = ?';
  db.query(checkQuery, [sessionId, productId], (err, results) => {
    if (err) {
      console.error('Error checking wishlist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Item is already in wishlist, so remove it
      const removeQuery = 'DELETE FROM wishlist WHERE session_id = ? AND product_id = ?';
      db.query(removeQuery, [sessionId, productId], (err, results) => {
        if (err) {
          console.error('Error removing from wishlist:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Product removed from wishlist' });
      });
    } else {
      // Item is not in wishlist, so add it
      const addQuery = 'INSERT INTO wishlist (session_id, product_id) VALUES (?, ?)';
      db.query(addQuery, [sessionId, productId], (err, results) => {
        if (err) {
          console.error('Error adding to wishlist:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Product added to wishlist' });
      });
    }
  });
};

const getUserWishlist = (req, res) => {
  const sessionId = req.cookies.token;
  
  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const query = `
    SELECT o.id, o.title, o.price, o.location, o.description, o.product_img, o.avg_rating
    FROM wishlist w
    JOIN offer o ON w.product_id = o.id
    WHERE w.session_id = ?
  `;

  db.query(query, [sessionId], (err, results) => {
    if (err) {
      console.error('Error fetching wishlist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
   
    res.status(200).json(results);
  });
};


export { addToWishlist, getUserWishlist };
