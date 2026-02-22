const express = require('express');
const Student = require('../models/Student');
const Task = require('../models/Task');
const Router = express.Router();

Router.get("/:id", async (request, response) => {
    const { id } = request.params;

    const student = await Student.findByPk(id, {
        include: Task
    })

    response.send(student);
})

Router.post("/", async (request, response) => {
    const { title, description, status, studentId } = request.body;
    const task = await Task.create({
        title,
        description,
        status,
        studentId
    })
    response.send(task);
})

module.exports = Router;