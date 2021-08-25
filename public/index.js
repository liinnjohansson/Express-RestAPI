window.addEventListener("load", main);

function main() {
  addClickEventOnFetchAllItemsButton();
  addClickEventOnSearchButton();
  addClickEventOnAddButton();
}

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

function extractItemTemplate() {
  const template = document.getElementById("shoe-item-template");
  const listItem = template.content.cloneNode(true);
  return listItem;
}

function extractSearchTemplate() {
  const template = document.getElementById("search-template");
  const inputField = template.content.cloneNode(true);
  return inputField;
}

function extractFormTemplate() {
  const template = document.getElementById("post-template");
  const formNode = template.content.cloneNode(true);
  const form = formNode.getElementById("post-form");
  return form;
}

function setSubHeader(text) {
  subHeader = document.querySelector(".sub-header");
  subHeader.innerHTML = text;
}

function clearElements() {
  const ul = document.getElementById("shoe-list");
  const searchField = document.getElementById("input-field");
  const formContainer = document.getElementById("post-form-container");
  const subHeader = document.querySelector(".sub-header");
  ul.innerHTML = "";
  searchField.innerHTML = "";
  formContainer.innerHTML = "";
  subHeader.innerHTML = "";
}

function displaySearchField() {
  clearElements();
  const searchFieldContainer = document.getElementById("input-field");
  const template = document.getElementById("search-template");
  const inputField = template.content.cloneNode(true);
  const btn = inputField.getElementById("submit-search-btn");
  btn.addEventListener("click", () => fetchOneItem());
  searchFieldContainer.append(inputField);
}

function displayForm(item) {
  clearElements();
  const formContainer = document.getElementById("post-form-container");
  const form = extractFormTemplate();
  formContainer.append(form);
  form.onsubmit = (event) => addOrEditItem(event, item);
}

async function fetchAllItems() {
  clearElements();
  setSubHeader("All items in storage");
  const ul = document.getElementById("shoe-list");

  await fetch("/api/shoes")
    .then((response) => response.json())
    .then((items) => {
      for (const item of items) {
        const listItem = extractItemTemplate();
        const deleteBtn = listItem.getElementById("delete-btn");
        const editBtn = listItem.getElementById("edit-btn");
        const paragraf = listItem.getElementById("shoe-item");
        paragraf.innerText = JSON.stringify(item, null, 4);

        deleteBtn.addEventListener("click", () => deleteItem(item));
        editBtn.addEventListener("click", () => displayForm(item));

        ul.append(listItem);
      }
    })
    .catch((err) => console.log("Request Failed", err));
}

async function fetchOneItem() {
  setSubHeader("Result after search");
  const ul = document.getElementById("shoe-list");
  ul.innerHTML = "";
  const input = document.getElementById("ID");

  await fetch("/api/shoes/" + input.value)
    .then((response) => response.json())
    .then((item) => {
      const listItem = extractItemTemplate();
      const paragraf = listItem.getElementById("shoe-item");
      paragraf.innerText = JSON.stringify(item, null, 4);

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

  if (item) {
    await fetch("/api/shoes/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((newItem) => {
        console.log(newItem);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    await fetch("/api/shoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((newItem) => {
        console.log(newItem);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

async function deleteItem(item) {
  await fetch("api/shoes/" + item.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

async function editItem(item) {
  await fetch("api/shoes/" + item.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
