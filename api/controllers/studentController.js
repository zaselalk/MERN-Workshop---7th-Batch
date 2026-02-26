const Student = require('../models/Student');
const { sendServerError } = require('../utils/sendServer');


/**
 * Handler function to retrieve all students from the database.
 * It sends the list of students as a response. 
 * If there's an error during the process, it sends a server error response with an appropriate message.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const getStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        return res.send(students);
    } catch (error) {
        return sendServerError(res, error, 'Failed to fetch students');
    }
};

/**
 * Creates a new student in the database using the data provided in the request body.
 * It expects the request body to contain the student's name, age, and grade.
 * If any of these fields are missing, it sends a 400 Bad Request response with an appropriate message.
 * If the student is created successfully, it sends a 201 Created response with a success message and the created student data.
 * If there's an error during the process, it sends a server error response with an appropriate message.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createStudent = async (req, res) => {
    try {
        const { name, age, grade } = req.body;

        if (!name || age === undefined || !grade) {
            return res.status(400).send({
                message: 'name, age and grade are required'
            });
        }

        const newStudent = await Student.create({
            name,
            age,
            grade
        });

        return res.status(201).send({
            message: 'Student created successfully',
            student: newStudent
        });
    } catch (error) {
        return sendServerError(res, error, 'Failed to create student');
    }
};

/**
 * Handler function to delete a student from the database based on the provided ID in the request parameters.
 * It attempts to delete the student with the specified ID and sends a response indicating whether the deletion was successful or if the student was not found.
 * If there's an error during the process, it sends a server error response with an appropriate message.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCount = await Student.destroy({
            where: {
                id
            }
        });

        if (!deletedCount) {
            return res.status(404).send({
                message: 'Student not found'
            });
        }

        return res.send({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        return sendServerError(res, error, 'Failed to delete student');
    }
};

/**
 * Updates a student's information in the database based on the provided ID in the request parameters and the updated data in the request body.
 * It expects the request body to contain the updated name, age, and grade of the student.
 * If the student with the specified ID is not found, it sends a 404 Not Found response with an appropriate message.
 * If the update is successful, it sends a response indicating that the student was updated successfully.
 * If there's an error during the process, it sends a server error response with an appropriate message.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, grade } = req.body;

        const [updatedCount] = await Student.update({
            name,
            age,
            grade
        }, {
            where: {
                id
            }
        });

        if (!updatedCount) {
            return res.status(404).send({
                message: 'Student not found'
            });
        }

        return res.send({
            message: 'Student updated successfully'
        });
    } catch (error) {
        return sendServerError(res, error, 'Failed to update student');
    }
};

module.exports = {
    getStudents,
    createStudent,
    deleteStudent,
    updateStudent
};