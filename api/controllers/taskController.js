const Student = require('../models/Student');
const Task = require('../models/Task');
const { sendServerError } = require('../utils/sendServer');


/**
 * This function retrieves a student by their ID and 
 * includes their associated tasks. 
 * It sends the student data as a response. 
 * If there's an error during the process, 
 * it sends a server error response with an appropriate message.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const getStudentTasks = async (request, response) => {
    try {
        const { id } = request.params;

        const student = await Student.findByPk(id, {
            include: Task
        });

        return response.send(student);
    } catch (error) {
        return sendServerError(response, error, 'Failed to fetch student tasks');
    }
};

/**
 * Handler function to create a new task for a student.
 * It expects the request body to contain the task details (title, description, status) and the studentId.
 * It creates a new task in the database and sends the created task as a response.
 * If there's an error during the process, it sends a server error response with an appropriate message.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const createTask = async (request, response) => {
    try {
        const { title, description, status, studentId } = request.body;

        const task = await Task.create({
            title,
            description,
            status,
            studentId
        });

        return response.status(201).send(task);
    } catch (error) {
        return sendServerError(response, error, 'Failed to create task');
    }
};

module.exports = {
    getStudentTasks,
    createTask
};