function getElement(id) {
  return document.getElementById(id);
}

function hideModal() {
  getElement("modal").style.display = "none";
}

function openModal() {
  getElement("modal").style.display = "block";

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

  enableCouponButton();
  enablePurchaseButton();
}

function applyCouponCode() {
  couponCode = getElement("coupon_input").value;
  updateDisplayedValues();
}

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

function calculateDiscountPrice() {
  return (totalPrice * discountPercentage) / 100;
}

function formatPrice(price) {
  return price.toFixed(2) + " TK";
}

function handleProductClick(container) {
  const productName = container.querySelector(".product_name").textContent;
  const productPrice = container.querySelector(".product_price").textContent;

  const modifiedProductPrice = parseFloat(productPrice.slice(0, -2));
  totalPrice += modifiedProductPrice;

  const listItem = document.createElement("li");
  listItem.textContent = `${productName} - ${productPrice}`;
  cardItemsList.appendChild(listItem);

  updateDisplayedValues();
  enableCouponButton();
  enablePurchaseButton();
}

function enableCouponButton() {
  if (totalPrice >= 200) {
    getElement("coupon_apply_btn").removeAttribute("disabled");
  } else {
    getElement("coupon_apply_btn").setAttribute("disabled", true);
  }
}

function enablePurchaseButton() {
  if (totalPrice > 0) {
    getElement("purchase").removeAttribute("disabled");
  } else {
    getElement("purchase").setAttribute("disabled", true);
  }
}

const singleProductContainers = document.querySelectorAll(".single-product");
const cardItemsList = getElement("card_items");

let totalPrice = 0;
let discountPercentage = 20;
let couponCode = "";

hideModal();

singleProductContainers.forEach((container) => {
  container.addEventListener("click", () => {
    handleProductClick(container);
  });
});

getElement("coupon_apply_btn").addEventListener("click", applyCouponCode);
getElement("purchase").addEventListener("click", openModal);
getElement("close_modal_btn").addEventListener("click", hideModal);
