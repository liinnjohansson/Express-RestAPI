window.addEventListener("load", main);

function main() {
  fetchShoes();
  addClickEventOnFetchAllItemsButton();
  addClickEventOnSearchButton();
  addClickEventOnAddButton();
}

function addClickEventOnFetchAllItemsButton() {
  const btn = document.getElementById("all-btn");
  btn.addEventListener("click", () => fetchShoes());
}

function addClickEventOnSearchButton() {
  const btn = document.getElementById("search-btn");
  btn.addEventListener("click", () => displaySearchField());
}

function addClickEventOnAddButton() {
  const btn = document.getElementById("add-btn");
  btn.addEventListener("click", () => addShoe());
}

function displaySearchField() {
  const ul = document.getElementById("shoe-list");
  const searchField = document.getElementById("input-field");
  const template = document.getElementById("search-template");
  ul.innerHTML = "";
  searchField.innerHTML = "";
  const inputField = template.content.cloneNode(true);
  const btn = inputField.getElementById("submit-btn");
  btn.addEventListener("click", () => fetchOneShoe());
  searchField.append(inputField);
}


async function fetchShoes() {
  const searchField = document.getElementById("input-field");
  const ul = document.getElementById("shoe-list");
  const template = document.getElementById("shoe-item-template");
  ul.innerHTML = "";
  searchField.innerHTML = "";
  
  await fetch("/api/shoes")
  .then((response) => response.json())
  .then((json) => {
    const listItem = template.content.cloneNode(true);
    const subHeader = listItem.querySelector(".sub-header");
      const paragraf = listItem.getElementById("shoe-item");
      paragraf.innerText = JSON.stringify(json, null, 4);
        subHeader.innerHTML = "All shoes in storage";

      // removeBtn.addEventListener("click", () => removeTodoItem(todoItem));
      // editBtn.addEventListener("click", () => displayTodoForm(todoItem));

      ul.append(listItem);
    })
    .catch((err) => console.log("Request Failed", err));
}

async function fetchOneShoe() {
  const ul = document.getElementById("shoe-list");
  const itemTemplate = document.getElementById("shoe-item-template");
  const searchTemplate = document.getElementById("search-template");
  ul.innerHTML = "";
  const input = document.getElementById("ID");
  console.log("Inne i fetchOneShoe");

  await fetch("/api/shoes/" + input.value)
    .then((response) => response.json())
    .then((json) => {
      const listItem = itemTemplate.content.cloneNode(true);
      const paragraf = listItem.getElementById("shoe-item");
      paragraf.innerText = JSON.stringify(json, null, 4);

      ul.append(listItem);
    })
    .catch((err) => console.log("Request Failed", err));

  input.value = "";
}
