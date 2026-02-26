// set the environment variables from .env file
require('dotenv').config();

// get the port from env
const PORT = process.env.PORT || 3000;


const express = require('express');
const cors = require('cors');
const sequalize = require('./db/dbConfig');

require('./models');
const studentRouter = require('./routes/student');
const taskRouter = require('./routes/tasks');

const app = express();

// setup cors
app.use(cors());
// add json body parser
app.use(express.json());

// sync the database models with the database - 
// Use the migration in production
sequalize.sync({
    alter: true
});


app.use("/api/v1/students", studentRouter)
app.use("/api/v1/tasks", taskRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})




