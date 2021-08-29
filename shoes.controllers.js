const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const status = require("./shoes.statuscode.handler");

//Define path to jSON-file
let shoesPath = path.resolve(__dirname, "shoes.json");

//Gets all shoes
const getShoes = (req, res) => {
  fs.readFile(shoesPath, "utf8", (err, data) => {
    if (err) {
      status.readingFileError(res, err);
    } else {
      if (data) {
        const shoes = JSON.parse(data);
        if(shoes.length > 0) status.success(res, shoes);
        else status.shoesNotFound(res);
      } else status.shoesNotFound(res);
    }
  });
};

//Gets one specific shoe depending on requested id
const getOneShoe = (req, res) => {
  const { id } = req.params;
  fs.readFile(shoesPath, "utf8", (err, data) => {
    if (err) {
      status.readingFileError(res, err);
    } else {
      if (data) {
        const shoes = JSON.parse(data);
        const shoe = shoes.find((shoe) => shoe.id == id);
        if (shoe) status.success(res, shoe);
        else status.shoeNotFound(res);
      } else status.shoesNotFound(res);
    }
  });
};

//Adds shoe by request
const addShoe = (req, res) => {
  const shoe = { ...req.body, id: uuidv4() };

  fs.readFile(shoesPath, "utf8", (err, data) => {
    if (err) {
      status.readingFileError(res, err);
    } else {
      if (data) {
        const shoes = JSON.parse(data);
        shoes.push(shoe);
        fs.writeFile(shoesPath, JSON.stringify(shoes, null, 4), (err) => {
          if (err) {
            status.writingFileError(res, err);
          } else status.success(res, shoe);
        });
      } else status.addBadRequest(res);
    }
  });
};

//Edits shoe depending on id from request
const editShoe = (req, res) => {
  const { id } = req.params;
  fs.readFile(shoesPath, "utf8", (err, data) => {
    if (err) {
      status.readingFileError(res, err);
    } else {
      if (data) {
        const shoes = JSON.parse(data);
        const shoe = shoes.find((shoe) => shoe.id == id);
        if (shoe) {
          Object.assign(shoe, req.body);
          fs.writeFile(shoesPath, JSON.stringify(shoes, null, 4), (err) => {
            if (err) {
              status.writingFileError(res, err);
            } else status.success(res, shoe);
          });
        } else status.shoeNotFound(res);
      }
      else status.shoesNotFound(res);
    }
  });
};

//Deletes shoe depending on id from request
const deleteShoe = (req, res) => {
  const { id } = req.params;
  fs.readFile(shoesPath, "utf8", (err, data) => {
    if (err) {
      status.readingFileError(res, err);
    } else {
      if (data) {
        const shoes = JSON.parse(data);
        const i = shoes.findIndex((shoe) => shoe.id == id);
        if (i != -1) {
          shoes.splice(i, 1);
          fs.writeFile(shoesPath, JSON.stringify(shoes, null, 4), (err) => {
            if (err) {
              status.writingFileError(res, err);
            } else status.deleteSuccess(res);
          });
        } else status.shoeNotFound(res);
      } else status.shoesNotFound(res);
    }
  });
};

module.exports = {
  getShoes,
  getOneShoe,
  addShoe,
  editShoe,
  deleteShoe,
};