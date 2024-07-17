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

const getTrips = (req, res) => {
  const query = `
    SELECT id, firstName, lastName, email, country, phone, address, 
           tripType, numberOfTravelers, averageAge, budget, destination, 
           checkInDate, checkOutDate, additionalInfo 
    FROM trips
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching trips:', err);
      res.status(500).json({ error: 'An error occurred while fetching trips' });
      return;
    }
    res.json(results);
  });
};

const deleteTrip = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM trips WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting trip:', err);
      res.status(500).json({ error: 'An error occurred while deleting the trip' });
      return;
    }
    res.json({ message: 'Trip deleted successfully' });
  });
};

export { getTrips, deleteTrip };