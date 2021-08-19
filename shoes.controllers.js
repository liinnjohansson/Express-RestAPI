const express = require('express');

let shoeIdIndex = 1;
let shoes = []

const getShoes = (req, res) => {
    res.status(200).json(shoes);
}

const getOneShoe = (req, res) => {
    const { id } = req.params;
    const shoe = shoes.find(shoe => shoe.id == id);
    if(shoe != null) res.status(200).json(shoe);
    else res.status(404).json('Does not exist');
}

const addShoe = (req, res) => {
    const shoe = {...req.body, id: shoeIdIndex++};
    shoes.push(shoe);
    res.status(200).json(shoe);
}

const editShoe = (req, res) => {
    const { id } = req.params;
    let shoe = shoes.find(shoe => shoe.id == id);
    if(shoe != null){
        Object.assign(shoe, req.body);
        res.status(200).json(shoe);
    } 
    else res.status(404).json('Does not exist');
}

const deleteShoe = (req, res) => {
    const { id } = req.params;
    const i = shoes.findIndex(shoe => shoe.id == id);
    if(i != -1) {
        shoes.splice(i, 1);
        res.status(200).json('Confirm: Item was removed');
    } 
    else res.status(404).json('Error: Can not find item to remove');
}

module.exports = {
    getShoes,
    getOneShoe,
    addShoe,
    editShoe,
    deleteShoe
}