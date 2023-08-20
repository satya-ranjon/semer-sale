// Define a function to get an element by its ID
function getElement(id) {
  return document.getElementById(id);
}

// Hide the modal
getElement("close_modal_btn").addEventListener("click", () => {
  getElement("modal").style.display = "none";
});

// Get the containers of the single product components
const singleProductContainers = document.querySelectorAll(".single-product");

// Get the card items component
const cardItemsList = getElement("card_items");

// Loop through single product containers
singleProductContainers.forEach((container) => {
  container.addEventListener("click", () => {
    const productName = container.querySelector(".product_name").textContent;
    const productPrice = container.querySelector(".product_price").textContent;

    // Create a list item to add to the card items list
    const listItem = document.createElement("li");
    listItem.textContent = `${productName} - ${productPrice}`;

    // Append the list item to the card items list
    cardItemsList.appendChild(listItem);
  });
});
