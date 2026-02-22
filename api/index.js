const express = require('express');
const cors = require('cors');
const sequalize = require('./db/dbConfig');

require('./models');
const studentRouter = require('./routes/student');

const app = express();

// setup cors
app.use(cors());
// add json body parser
app.use(express.json());
sequalize.sync({
    alter: true
});


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




