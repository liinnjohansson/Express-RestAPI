const express = require('express');
const { getShoes, getOneShoe, addShoe, editShoe, deleteShoe} = require('./shoes.controllers');

const router = express.Router();

router.get('/api/shoes', getShoes);
router.get('/api/shoes/:id', getOneShoe);
router.post('/api/shoes', addShoe);
router.put('/api/shoes/:id', editShoe)
router.delete('/api/shoes/:id', deleteShoe)

module.exports = router;
