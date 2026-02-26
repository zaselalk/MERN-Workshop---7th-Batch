const { Sequelize } = require("sequelize");

// load environment variables from .env file
require('dotenv').config();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// create database connection
const sequalize = new Sequelize({
    dialect: 'mysql',
    host: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
})

module.exports = sequalize;
