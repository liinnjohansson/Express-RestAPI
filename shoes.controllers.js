const express = require('express');

let shoeIdIndex = 1;
let shoes = []

const getShoes = (req, res) => {
    res.json(shoes);
}

const getOneShoe = (req, res) => {
    const { id } = req.params;
    const shoe = shoes.find(shoe => shoe.id == id);
    res.json(shoe);
}

const addShoe = (req, res) => {
    const shoe = {...req.body, id: shoeIdIndex++};
    shoes.push(shoe);
    res.json(shoe);
}

const editShoe = (req, res) => {
    const { id } = req.params;
    let shoe = shoes.find(shoe => shoe.id == id);
    if(shoe != null)
    {
        Object.assign(shoe, req.body);
        res.json(shoe);
    } else {
        res.json('Does not exist');
    }
}

const deleteShoe = (req, res) => {
    const { id } = req.params;
    const i = shoes.findIndex(shoe => shoe.id == id);
    if(i != -1)
    {
        shoes.splice(i, 1);
        res.json('Confirm: Item was removed');
    } else {
        res.json('Error: Can not find item to remove');
    }
}

module.exports = {
    getShoes,
    getOneShoe,
    addShoe,
    editShoe,
    deleteShoe
}