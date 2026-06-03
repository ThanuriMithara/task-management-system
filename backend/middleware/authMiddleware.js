const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Check role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};

module.exports = { protect, authorize };