const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @route GET /students
 * @desc Get all students
 * @access Public
 */
router.get('/', studentController.getStudents);

/**
 * @route POST /students
 * @desc Create a new student
 * @access Public
 */
router.post("/", studentController.createStudent);

/**
 * @route DELETE /students/:id
 * @desc Delete a student by ID
 * @access Public
 */
router.delete('/:id', studentController.deleteStudent);

/**
 * @route PUT /students/:id
 * @desc Update a student by ID
 * @access Public
 */
router.put('/:id', studentController.updateStudent);

module.exports = router;