const express = require('express');
const cors = require('cors');
const sequalize = require('./db/dbConfig');
const Student = require('./models/Student');
const studentRouter = require('./routes/student');

// import { Sequelize } from 'sequelize';
const app = express();

// setup cors
app.use(cors());
// add json body parser
app.use(express.json());
sequalize.sync();


// Home  - /
app.get('/', (request, response) => {
    response.send({
        message: 'Hello World!!'
    })
});

app.use("/students", studentRouter)



app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})




