const express = require('express');
const shoesRouter = require('./shoes.router');
const app = express();

app.use(express.json());

app.use(shoesRouter);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});