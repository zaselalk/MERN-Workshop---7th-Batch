const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// students 
// - /students - Get all students
router.get('/', async (req, res) => {
    // get students from database
    const students = await Student.findAll();
    res.send(students);
})

// - create student
router.post("/", async (req, res) => {
    const { name, age, grade } = req.body;

    // Create a new student object
    const newStudent = await Student.create({
        name,
        age,
        grade
    })

    res.send({
        message: 'Student created successfully',
        student: newStudent
    })
})

// delete student
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    // delete student from database
    await Student.destroy({
        where: {
            id
        }
    })

    res.send({
        message: 'Student deleted successfully'
    })
})

// update student
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, grade } = req.body;

    // update student in database
    await Student.update({
        name,
        age,
        grade
    }, {
        where: {
            id
        }
    })

    res.send({
        message: 'Student updated successfully'
    })
})

module.exports = router;