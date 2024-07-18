import mysql from 'mysql';
import * as config from '../config.js'; // Adjust path as necessary
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

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

const getCallRequests = (req, res) => {
  const query = 'SELECT id, first_name, last_name, email, phone, country, inquiry FROM call_requests';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
      return;
    }
    res.json(results);
  });
};

const deleteCallRequest = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM call_requests WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting call request:', err);
      res.status(500).json({ error: 'An error occurred while deleting the call request' });
      return;
    }
    res.json({ message: 'Call request deleted successfully' });
  });
};


const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }


  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
    } 
  });

  db.query('SELECT * FROM admin WHERE username = ?', [username], async (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'yourjwtsecret', { expiresIn: '1h' });

    res.json({ token });
  });
};



export { getCallRequests, deleteCallRequest, adminLogin };