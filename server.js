const express = require('express');
const shoesRouter = require('./shoes.router');

//Create instance of express
const app = express();

//Parse incoming data to JSON
app.use(express.json());


app.use(express.static('public'));

app.use(shoesRouter);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});