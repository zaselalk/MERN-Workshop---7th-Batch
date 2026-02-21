const { Model, Sequelize } = require("sequelize");
const dbConfig = require("../db/dbConfig");

class Student extends Model { }

Student.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grade: {
        type: Sequelize.STRING
    }
},
    {
        sequelize: dbConfig,
    }
)

module.exports = Student;

