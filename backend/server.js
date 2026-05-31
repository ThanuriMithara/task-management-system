require('./config/db');
// Import the packages we installed
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load the .env file (secret keys)
dotenv.config();

// Create the server 
const app = express();

// Middleware — runs on every request
app.use(cors());         // connect to frontend
app.use(express.json()); // Understand JSON data sent by frontend

// Test route — when someone visits '/' show this message
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running!' });
});

// Start listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
