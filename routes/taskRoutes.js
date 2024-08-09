const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', authMiddleware, taskController.createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', authMiddleware, taskController.getTasks);

// @route   GET /api/tasks/:id
// @desc    Get a specific task by ID
// @access  Private
router.get('/:id', authMiddleware, taskController.getTask);

// @route   PUT /api/tasks/:id/complete
// @desc    Mark a specific task as completed
// @access  Private
router.put('/:id/complete', authMiddleware, taskController.markTaskComplete);

// @route   GET /api/tasks/category/:category
// @desc    Get tasks by category
// @access  Private
router.get('/category/:category', authMiddleware, taskController.getTasksByCategory);

// @route   PUT /api/tasks/:id
// @desc    Update a specific task by ID
// @access  Private
router.put('/:id', authMiddleware, taskController.updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a specific task by ID
// @access  Private
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;