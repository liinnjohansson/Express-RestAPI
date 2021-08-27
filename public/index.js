window.addEventListener("load", main);

function main() {
  addClickEventOnFetchAllItemsButton();
  addClickEventOnSearchButton();
  addClickEventOnAddButton();
}

//Adds events to main buttons

function addClickEventOnFetchAllItemsButton() {
  const btn = document.getElementById("all-btn");
  btn.addEventListener("click", () => fetchAllItems());
}

function addClickEventOnSearchButton() {
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", () => displaySearchField());
}

function addClickEventOnAddButton() {
  const btn = document.getElementById("add-btn");
  btn.addEventListener("click", () => displayForm());
}

// Extracts templates for items, search-display, form and error

//Item template

function extractItemTemplate() {
  const template = document.getElementById("item-template");
  const listItem = template.content.cloneNode(true);
  return listItem;
}

//Search-display template

function extractSearchTemplate() {
  const template = document.getElementById("search-template");
  const inputField = template.content.cloneNode(true);
  return inputField;
}

//Form template

function extractFormTemplate() {
  const template = document.getElementById("post-edit-template");
  const form = template.content.cloneNode(true);
  return form;
}

//Error template

function extractErrorTemplate() {
  const template = document.getElementById("error-template");
  const form = template.content.cloneNode(true);
  return form;
}

// Sets the small header above result depending on type of result

function setSubHeader(text) {
  subHeader = document.querySelector(".sub-header");
  subHeader.innerHTML = text;
}

//Clears HTML-elements(tags) when switching feature

function clearElements() {
  const ul = document.getElementById("item-list");
  const searchField = document.getElementById("search-field");
  const formContainer = document.getElementById("form-container");
  const subHeader = document.querySelector(".sub-header");
  ul.innerHTML = "";
  searchField.innerHTML = "";
  formContainer.innerHTML = "";
  subHeader.innerHTML = "";
}

//Displays the search-field when clicking main search button

function displaySearchField() {
  clearElements();
  const searchField = document.getElementById("search-field");
  const template = document.getElementById("search-template");
  const inputField = template.content.cloneNode(true);
  const btn = inputField.getElementById("submit-search-btn");
  btn.addEventListener("click", () => fetchOneItem());
  searchField.append(inputField);
}

//Sets values on form input fields based on item to edit

function setInputValuesWhenEditItem(form, item) {
  const type = form.getElementById("item-type");
  const colour = form.getElementById("item-colour");
  const material = form.getElementById("item-material");
  const size = form.getElementById("item-size");
  const quantity = form.getElementById("item-quantity");
  type.value = item.type;
  colour.value = item.colour;
  material.value = item.material;
  size.value = item.size;
  quantity.value = item.quantity;
}

//Displays form for adding or editing item

function displayForm(item) {
  clearElements();
  const formContainer = document.getElementById("form-container");
  const formTemplate = extractFormTemplate();
  const form = formTemplate.getElementById("post-edit-form");

  if (item) {
    setInputValuesWhenEditItem(formTemplate, item);
  }

  formContainer.append(form);
  form.onsubmit = (event) => addOrEditItem(event, item);
}

//Creates a list item

function createListItem(item) {
  const ul = document.getElementById("item-list");
  const listItem = extractItemTemplate();
  const deleteBtn = listItem.getElementById("delete-btn");
  const editBtn = listItem.getElementById("edit-btn");
  const itemContainer = listItem.getElementById("item-container");
  itemContainer.innerText = JSON.stringify(item, null, 4);

  deleteBtn.addEventListener("click", () => deleteItem(item));
  editBtn.addEventListener("click", () => displayForm(item));

  ul.append(listItem);
}

//Creates a error item (error message)

function createErrorItem(item) {
  const ul = document.getElementById("item-list");
  const errorTemplate = extractErrorTemplate();
  const errorContainer = errorTemplate.getElementById("error-container");
  console.log(errorContainer);
  errorContainer.innerHTML = item;
  ul.append(errorTemplate);
}

//Fetches all items from api

async function fetchAllItems() {
  clearElements();
  setSubHeader("All items in storage");

  const response = await fetch("/api/shoes");
  const items = await response.json();
  
  if (response.ok) {
    for (const item of items) {
      createListItem(item);
    }
  } else {
    createErrorItem(item);
  }
}

//Fetches one specific item from api, by requested Id

async function fetchOneItem() {
  setSubHeader("Result after search");
  const ul = document.getElementById("item-list");
  ul.innerHTML = "";
  const input = document.getElementById("search-item");

  const response = await fetch("/api/shoes/" + input.value);
  const item = await response.json();

  if (response.ok) {
    createListItem(item);
  } else {
    createErrorItem(item);
  }

  input.value = "";
}

//Calls add or edit methods (PUT or POST)

function addOrEditItem(event, item) {
  event.preventDefault();
  const inputType = event.target.querySelector("#item-type");
  const inputColour = event.target.querySelector("#item-colour");
  const inputMaterial = event.target.querySelector("#item-material");
  const inputSize = event.target.querySelector("#item-size");
  const inputQuantity = event.target.querySelector("#item-quantity");

  const newItem = {
    type: inputType.value,
    colour: inputColour.value,
    material: inputMaterial.value,
    size: inputSize.value,
    quantity: inputQuantity.value,
  };

  if (item) {
    editItem(item, newItem);
  } else {
    addItem(newItem);
  }
}

//Adds one item thru api

async function addItem(item) {
  setSubHeader("Result");

  const response = await fetch("/api/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const responseItem = await response.json();

  if (response.ok) {
    createListItem(responseItem);
  } else {
    createErrorItem(responseItem);
  }

  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = "";
}

//Updates one specific item in api, by requested Id

async function editItem(item, update) {
  setSubHeader("Result");

  const response = await fetch("/api/shoes/" + item.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  });
  const responseItem = await response.json();

  if (response.ok) {
    createListItem(responseItem);
  } else {
    createErrorItem(responseItem);
  }

  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = "";
}

//Deletes one specific item in api, by requested Id

async function deleteItem(item) {
  const ul = document.getElementById("item-list");
  ul.innerHTML = "";
  setSubHeader("Result");

  const response = await fetch("api/shoes/" + item.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const responseItem = await response.json();
  if (response.ok) {
    const message = document.createElement("p");
    message.innerHTML = responseItem;
    ul.append(message);
  } else {
    const errorTemplate = extractErrorTemplate();
    const errorContainer = errorTemplate.getElementById("error-container");
    errorContainer.innerHTML = responseItem;
    ul.append(errorTemplate);
  }
}