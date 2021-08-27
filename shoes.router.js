const express = require('express');
const { getShoes, getOneShoe, addShoe, editShoe, deleteShoe} = require('./shoes.controllers');

//Create router object
const router = express.Router();

//Define router endpoints
router.get('/api/shoes', getShoes);
router.get('/api/shoes/:id', getOneShoe);
router.post('/api/shoes', addShoe);
router.put('/api/shoes/:id', editShoe)
router.delete('/api/shoes/:id', deleteShoe)

//Export router object
module.exports = router;
