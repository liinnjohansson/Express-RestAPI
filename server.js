const express = require('express');
const app = express();

let shoes = [{
    id: 0,
    type: 'heels',
    colour: 'pink',
    material: 'leather',
    size: 38
}]

app.use(express.json());

app.get('/api/shoes', (req, res) => {
    res.json(shoes);
})

app.get('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    const shoe = shoes.find(shoe => shoe.id == id);
    res.json(shoe);
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});