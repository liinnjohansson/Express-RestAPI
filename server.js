const express = require('express');
const app = express();

let shoes = []

app.use(express.json());

app.get('/api/shoes', (req, res) => {
    res.json(shoes);
})

app.get('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    const shoe = shoes.find(shoe => shoe.id == id);
    res.json(shoe);
})

app.post('/api/shoes', (req, res) => {
    const shoe = req.body;
    shoes.push(shoe);
    res.send('The shoe was successfully added to the storage');
});

app.delete('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    const i = shoes.findIndex(shoe => shoe.id == id);
    shoes.splice(i, 1);
    res.json('REMOVED');
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});