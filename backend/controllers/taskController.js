const pool = require('../config/db');

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, assigned_to, due_date, priority } = req.body;

    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, assigned_to, due_date, priority, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, assigned_to, due_date, priority || 'Medium', req.user.id]
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask.rows[0]
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    res.json({ tasks: tasks.rows });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await pool.query(
      'SELECT * FROM tasks WHERE id = $1', [id]
    );

    if (task.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task: task.rows[0] });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigned_to, due_date, priority, status } = req.body;

    const updatedTask = await pool.query(
      'UPDATE tasks SET title=$1, description=$2, assigned_to=$3, due_date=$4, priority=$5, status=$6 WHERE id=$7 RETURNING *',
      [title, description, assigned_to, due_date, priority, status, id]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task: updatedTask.rows[0]
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      'DELETE FROM tasks WHERE id=$1 RETURNING *', [id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };