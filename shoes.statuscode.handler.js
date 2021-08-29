//200 Success
const success = (res, content) => {
  res.status(200).json(content);
};

const deleteSuccess = (res) => {
  res.status(200).json("Item was removed");
};

//400 Bad Request
const addBadRequest = (res) => {
  res
    .status(400)
    .json(
      "There seems to be problem adding items to server. Please, try again!"
    );
};

//404 Not Found
const shoesNotFound = (res) => {
  res.status(404).json("There are no shoes in storage");
};

const shoeNotFound = (res) => {
  res
    .status(404)
    .json("Shoe with requested ID does not exist, please, try again!");
};

//500 Internal Server Error
const readingFileError = (res, err) => {
  console.log(`Error occured while trying to read file: ${err}`);
  res
    .status(500)
    .json("Error occured when trying to receive data, please try again!");
};

const writingFileError = (res, err) => {
  console.log(`Error occured while trying to write to file: ${err}`);
  res
    .status(500)
    .json(
      "Error occured while trying to save data to server. Please, try again!"
    );
};

module.exports = {
  success,    
  deleteSuccess,
  addBadRequest, 
  shoesNotFound,
  shoeNotFound,
  readingFileError,
  writingFileError
};