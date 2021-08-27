const express = require('express');
const shoesRouter = require('./shoes.router');

//Create express server application
const app = express();

//Parse incoming data to JSON
app.use(express.json());

//Add resources
app.use(express.static('public'));
app.use(shoesRouter);

//Start the server
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});