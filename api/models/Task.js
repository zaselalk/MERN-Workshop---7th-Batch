const { Model, Sequelize } = require("sequelize");
const dbConfig = require("../db/dbConfig");
const Student = require("./Student");

class Task extends Model { }

Task.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        sequelize: dbConfig,
    }
)

module.exports = Task;