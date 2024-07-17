import mysql from 'mysql';
import * as config from '../config.js'; // Adjust path as necessary
import bodyParser from 'body-parser';


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


const submitCall = (req, res) => {
    const formData = req.body;

  const sql = 'INSERT INTO call_requests (first_name, last_name, country, phone, email, inquiry) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [
    formData.firstName,
    formData.lastName,
    formData.country,
    formData.phone,
    formData.email,
    formData.inquiry
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Failed to submit form data' });
      return;
    }
    console.log('Form data inserted successfully:', result);
    res.status(200).json({ message: 'Form data submitted successfully' });
  });
  };



  const submitTripForm = (req, res) => {
    const formData = req.body;
  const sql = 'INSERT INTO trips SET ?';
  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Failed to submit form data' });
      return;
    }
    console.log('Form data inserted successfully:', result);
    res.status(200).json({ message: 'Form data submitted successfully' });
  });
  };

  export { submitCall, submitTripForm };


