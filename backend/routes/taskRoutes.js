const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected - must be logged in
// GET all tasks
router.get('/', protect, getTasks);

// GET single task
router.get('/:id', protect, getTask);

// POST create task - only admin and project_manager
router.post('/', protect, authorize('admin', 'project_manager'), createTask);

// PUT update task
router.put('/:id', protect, updateTask);

// DELETE task - only admin and project_manager
router.delete('/:id', protect, authorize('admin', 'project_manager'), deleteTask);

module.exports = router;