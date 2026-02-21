const { Sequelize } = require("sequelize");

// create database connection
const sequalize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'student-db'
})

module.exports = sequalize;
