const express = require('express');
const app = express();

let shoeIdIndex = 1;
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
    const shoe = {...req.body, id: shoeIdIndex++};
    shoes.push(shoe);
    res.json(shoe);
});

app.delete('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    const i = shoes.findIndex(shoe => shoe.id == id);
    if(i != -1)
    {
        shoes.splice(i, 1);
        res.json('Confirm: Item was removed');
    } else {
        res.json('Error: Can not find item to remove');
    }
})

app.put('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    let shoe = shoes.find(shoe => shoe.id == id);
    Object.assign(shoe, req.body);
    res.json(shoe);
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});