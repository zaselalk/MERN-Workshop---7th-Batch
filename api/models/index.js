const Student = require("./Student");
const Task = require("./Task");

// define association
Student.hasMany(Task, { foreignKey: 'studentId' });
Task.belongsTo(Student, { foreignKey: 'studentId' });

