const { json } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');

let shoesPath = path.resolve(__dirname, 'shoes.json');

const readJsonFile = () => {
    //Gets the local path for project and file
    let shoesPath = path.resolve(__dirname, 'shoes.json');
    
    //Gets the buffer data from file
    let shoesData = fs.readFileSync(shoesPath);
    
    //Parse the buffer data to json
    let shoes = JSON.parse(shoesData);

    return shoes;
}

let shoeIdIndex = 1;
let shoesContainer = []

const getShoes = (req, res) => {
    res.status(200).json(readJsonFile());
}

const getOneShoe = (req, res) => {
    const { id } = req.params;
    const shoe = readJsonFile().find(shoe => shoe.id == id);
    if(shoe != null) res.status(200).json(shoe);
    else res.status(404).json('Does not exist');
}

const addShoe = (req, res) => {
    const shoe = {...req.body, id: shoeIdIndex++};
    const newList = readJsonFile();
    newList.push(shoe);
    fs.writeFile(shoesPath, JSON.stringify(newList, null, 4), (err) => {
                if(err){
                    console.log(`Error accured while trying to write to file: ${err}`);
                }
                else res.status(200).json(shoe);
            });
}

const editShoe = (req, res) => {
    const { id } = req.params;
    const newList = readJsonFile();
    const shoe = newList.find(shoe => shoe.id == id);
    if(shoe != null){
        Object.assign(shoe, req.body);
    fs.writeFile(shoesPath, JSON.stringify(newList, null, 4), (err) => {
                if(err){
                    console.log(`Error accured while trying to write to file: ${err}`);
                }
                else res.status(200).json(shoe);
            });
    } 
    else res.status(404).json('Does not exist');
}

const deleteShoe = (req, res) => {
    const { id } = req.params;
    const newList = readJsonFile();
    const i = newList.findIndex(shoe => shoe.id == id);
    if(i != -1) {
        newList.splice(i, 1);
            fs.writeFile(shoesPath, JSON.stringify(newList, null, 4), (err) => {
                if(err){
                    console.log(`Error accured while trying to write to file: ${err}`);
                }
                else res.status(200).json('Confirm: Item was removed');
            });
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