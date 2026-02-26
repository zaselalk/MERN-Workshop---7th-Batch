const express = require('express');
const Router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @route GET /tasks/:id
 * @desc Get tasks for a specific student by ID
 * @access Public
 */
Router.get("/:id", taskController.getStudentTasks);

/**
 * @route POST /tasks
 * @desc Create a new task for a student
 * @access Public
 */
Router.post("/", taskController.createTask);

module.exports = Router;