const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register route
// POST http://localhost:5000/api/auth/register
router.post('/register', register);

// Login route
// POST http://localhost:5000/api/auth/login
router.post('/login', login);

module.exports = router;