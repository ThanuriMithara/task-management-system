const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      'SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(
      'SELECT id, name, email, role, is_active, created_at FROM users WHERE id = $1',
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user (admin only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await pool.query(
      'UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING id, name, email, role',
      [name, email, role, id]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Deactivate user (admin only)
const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      'UPDATE users SET is_active=false WHERE id=$1 RETURNING id, name, email, is_active',
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User deactivated successfully',
      user: user.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUsers, getUser, updateUser, deactivateUser };