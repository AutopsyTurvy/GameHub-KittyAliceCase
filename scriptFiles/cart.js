//cart.js

document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
  });
  
  function displayCartItems() {
    var cartItems = localStorage.getItem("cart");
    var cartContainer = document.getElementById("cart-container");
  
    if (cartItems) {
      cartItems = cartItems.split(",");
  
      if (cartItems.length > 0) {
        cartContainer.innerHTML = cartItems.map(itemId => {
          return `<p>Item ID: ${itemId}</p>`;
        }).join('');
      } else {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      }
    } else {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
  }