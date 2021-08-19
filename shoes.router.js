const express = require('express');

const router = express.Router();

router.get('/api/shoes', (req, res) => {
    res.json(shoes);
})

router.get('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    const shoe = shoes.find(shoe => shoe.id == id);
    res.json(shoe);
})

router.post('/api/shoes', (req, res) => {
    const shoe = {...req.body, id: shoeIdIndex++};
    shoes.push(shoe);
    res.json(shoe);
});

router.put('/api/shoes/:id', (req, res) => {
    const { id } = req.params;
    let shoe = shoes.find(shoe => shoe.id == id);
    Object.assign(shoe, req.body);
    res.json(shoe);
})

router.delete('/api/shoes/:id', (req, res) => {
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

module.exports = router;
