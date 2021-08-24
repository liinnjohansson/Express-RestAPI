window.addEventListener('load', main);

function main(){
  fetchShoes();
  addClickEventToFetchAllItemsButton();
}

function addClickEventToFetchAllItemsButton() {
  const btn = document.getElementById("all-btn");
  btn.addEventListener("click", () => fetchShoes());

}

async function fetchShoes() {
  const ul = document.getElementById("shoe-list");
  const template = document.getElementById("shoe-item-template");
  ul.innerHTML = "";

const response = await fetch('/api/shoes');
    const result = await response.json();
    console.log(result);

    const subHeader = document.querySelector(".sub-header");
    subHeader.innerHTML = "All shoes in storage";

  for (const shoeItem of result) {
    const listItem = template.content.cloneNode(true);
    const deleteBtn = listItem.getElementById("delete-btn");
    const editBtn = listItem.getElementById("edit-btn");
    const shoeItemType = listItem.querySelector("#list-item-type");
    const shoeItemColour = listItem.querySelector("#list-item-colour");
    const shoeItemMaterial = listItem.querySelector("#list-item-material");
    const shoeItemSize = listItem.querySelector("#list-item-size");
    const shoeItemQuantity = listItem.querySelector("#list-item-quantity");
    shoeItemType.innerText = "Type: " + shoeItem.type;
    shoeItemColour.innerText = "Colour: " + shoeItem.colour;
    shoeItemMaterial.innerText = "Material: " + shoeItem.material;
    shoeItemSize.innerText = "Size: " + shoeItem.size;
    shoeItemQuantity.innerText = "Quantity: " + shoeItem.quantity;

    ul.append(listItem);
  }
}