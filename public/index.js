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

// Extracts templates for items, search-display and form

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
  const formNode = template.content.cloneNode(true);
  const form = formNode.getElementById("post-edit-form");
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

//Displays form for adding or editing item

function displayForm(item) {
  clearElements();
  const formContainer = document.getElementById("form-container");
  const form = extractFormTemplate();
  formContainer.append(form);
  form.onsubmit = (event) => addOrEditItem(event, item);
}

//Fetches all items from api

async function fetchAllItems() {
  clearElements();
  setSubHeader("All items in storage");
  const ul = document.getElementById("item-list");

  await fetch("/api/shoes")
    .then((response) => response.json())
    .then((items) => {
      for (const item of items) {
        const listItem = extractItemTemplate();
        const deleteBtn = listItem.getElementById("delete-btn");
        const editBtn = listItem.getElementById("edit-btn");
        const itemContainer = listItem.getElementById("item-container");
        itemContainer.innerText = JSON.stringify(item, null, 4);

        deleteBtn.addEventListener("click", () => deleteItem(item));
        editBtn.addEventListener("click", () => displayForm(item));

        ul.append(listItem);
      }
    })
    .catch((err) => console.log("Request Failed", err));
}

//Fetches one specific item from api, by requested Id

async function fetchOneItem() {
  setSubHeader("Result after search");
  const ul = document.getElementById("item-list");
  ul.innerHTML = "";
  const input = document.getElementById("search-item");

  await fetch("/api/shoes/" + input.value)
    .then((response) => response.json())
    .then((item) => {
      const listItem = extractItemTemplate();
      const itemContainer = listItem.getElementById("item-container");
      itemContainer.innerText = JSON.stringify(item, null, 4);

      const deleteBtn = listItem.getElementById("delete-btn");
      const editBtn = listItem.getElementById("edit-btn");
      deleteBtn.addEventListener("click", () => deleteItem(item));
      editBtn.addEventListener("click", () => displayForm(item));

      ul.append(listItem);
    })
    .catch((err) => {
      console.log("Request Failed", err);
    });

  input.value = "";
}

//Adds or edits (PUT or POST) one item to/from api

async function addOrEditItem(event, item) {
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

  if (item) editItem(item, newItem);
  else addItem(newItem);
}

//Adds one item to api

async function addItem(item) {
  await fetch("/api/shoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((item) => {
      console.log(item);
    })
    .catch((e) => {
      console.log(e);
    });
}

//Updates one specific item in api, by requested Id

async function editItem(item, update) {
  await fetch("/api/shoes/" + item.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  })
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((update) => {
      console.log(update);
    })
    .catch((e) => {
      console.log(e);
    });
}

//Deletes one specific item in api, by requested Id

async function deleteItem(item) {
  await fetch("api/shoes/" + item.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
