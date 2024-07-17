import mysql from 'mysql';
import * as config from '../config.js'; // Adjust path as necessary

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

export { getCallRequests, deleteCallRequest };