const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book_store'
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
  connection.release();
});

// Define route to fetch all books from the database
app.get('/allBooks', (req, res) => {
  pool.query('SELECT * FROM book', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
