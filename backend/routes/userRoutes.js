const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deactivateUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are admin only
// GET all users
router.get('/', protect, authorize('admin'), getUsers);

// GET single user
router.get('/:id', protect, getUser);

// PUT update user
router.put('/:id', protect, authorize('admin'), updateUser);

// DELETE deactivate user
router.put('/:id/deactivate', protect, authorize('admin'), deactivateUser);

module.exports = router;