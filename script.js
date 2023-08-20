// Function to get an element by its ID
function getElement(id) {
  return document.getElementById(id);
}

// Function to hide the modal
function hideModal() {
  getElement("modal").style.display = "none";

  // Reset displayed values to "00.00 Tk"
  getElement("display_total_price").textContent = "00.00 Tk";
  getElement("display_discount_price").textContent = "00.00 Tk";
  getElement("display_total").textContent = "00.00 Tk";

  // Clear the list of card items
  cardItemsList.innerHTML = "";

  // Clear the coupon code
  getElement("coupon_input").value = "";

  // Clear the totalPrice
  totalPrice = 0.0;

  // Enable coupon button and purchase button
  enableCouponButton();
  enablePurchaseButton();
}

// Function to open the modal and reset values
function openModal() {
  getElement("modal").style.display = "block";
}

// Function to apply a coupon code
function applyCouponCode() {
  couponCode = getElement("coupon_input").value;
  updateDisplayedValues();
}

// Function to update displayed values based on calculated discounts
function updateDisplayedValues() {
  const discountPrice = calculateDiscountPrice();
  const displayDiscountPrice = formatPrice(
    totalPrice >= 200 && couponCode === "SELL200" ? discountPrice : 0
  );
  const displayTotal = formatPrice(
    totalPrice >= 200 && couponCode === "SELL200"
      ? totalPrice - discountPrice
      : totalPrice
  );

  getElement("display_total_price").textContent = formatPrice(totalPrice);
  getElement("display_discount_price").textContent = displayDiscountPrice;
  getElement("display_total").textContent = displayTotal;
}

// Function to calculate the discount price
function calculateDiscountPrice() {
  return (totalPrice * discountPercentage) / 100;
}

// Function to format a price to display with "TK" at the end
function formatPrice(price) {
  return price.toFixed(2) + " TK";
}

// Function to handle a product click event
function handleProductClick(container) {
  const productName = container.querySelector(".product_name").textContent;
  const productPrice = container.querySelector(".product_price").textContent;

  const modifiedProductPrice = parseFloat(productPrice.slice(0, -2));
  totalPrice += modifiedProductPrice;

  const listItem = document.createElement("li");
  listItem.textContent = productName;
  cardItemsList.appendChild(listItem);

  updateDisplayedValues();
  enableCouponButton();
  enablePurchaseButton();
}

// Function to enable/disable the coupon button based on total price
function enableCouponButton() {
  if (totalPrice >= 200) {
    getElement("coupon_apply_btn").removeAttribute("disabled");
  } else {
    getElement("coupon_apply_btn").setAttribute("disabled", true);
  }
}

// Function to enable/disable the purchase button based on total price
function enablePurchaseButton() {
  if (totalPrice > 0) {
    getElement("purchase").removeAttribute("disabled");
  } else {
    getElement("purchase").setAttribute("disabled", true);
  }
}

// Select all product containers and card items list
const singleProductContainers = document.querySelectorAll(".single-product");
const cardItemsList = getElement("card_items");

// Initial values
let totalPrice = 0;
let discountPercentage = 20;
let couponCode = "";

// Hide the modal initially
hideModal();

// Attach click event listeners to each product container
singleProductContainers.forEach((container) => {
  container.addEventListener("click", () => {
    handleProductClick(container);
  });
});

// Attach event listeners to buttons
getElement("coupon_apply_btn").addEventListener("click", applyCouponCode);
getElement("purchase").addEventListener("click", openModal);
getElement("close_modal_btn").addEventListener("click", hideModal);
