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
        const products = cartItems.map(itemId => {
          const productDetails = localStorage.getItem(`product_${itemId}`);
          return productDetails ? JSON.parse(productDetails) : null;
        }).filter(product => product !== null);
  
        if (products.length > 0) {
          cartContainer.innerHTML = products.map(product => {
            return `
              <div class="cart-item">
                <img src="${product.image}" alt="${product.title}">
                <p>Title: ${product.title}</p>
                <p>Price: ${product.price}</p>
              </div>
            `;
          }).join('');
        } else {
          cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        }
      } else {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      }
    } else {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
  }