//cart.js

document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();
    addNumberOfItemsToCartIcon();
    updateTotalPrice();
  });
  
  function renderCartItems() {
    var cartItems = localStorage.getItem("cart");
  
    if (cartItems !== null && cartItems.trim() !== "") {
      cartItems = cartItems.split(",");
      var cartContainer = document.getElementById("cart-container");
  
      // Clear the existing content of the cartContainer
      cartContainer.innerHTML = "";
  
      cartItems.forEach(function (productId) {
        fetchProductDetails(productId).then(function (productDetails) {
          renderProductInCart(cartContainer, productDetails);
        });
      });
    } else {
      // Handle the case when the cart is empty
      var cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
  
    // Update the total price
    updateTotalPrice();
  }
  
  function fetchProductDetails(productId) {
    const baseUrl = "https://api.noroff.dev/api/v1/gamehub";
    const url = `${baseUrl}/${productId}`;
  
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error("An error occurred while fetching product details:", error.message);
      });
  }
  
  function renderProductInCart(cartContainer, productDetails) {
    if (productDetails && productDetails.title && productDetails.image) {
      var productElement = document.createElement("div");
      productElement.innerHTML = `
        <div class="cart-item">
          <img class="cart-item-image" src="${productDetails.image}" alt="${productDetails.title}">
          <div>
            <h3>${productDetails.title}</h3>
            <p>${productDetails.description}</p>
            <p>Price: ${productDetails.price}</p>
            <button class="remove-item-button" onclick="removeItemFromCart('${productDetails.id}')">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(productElement);
    }
  }
  
  function addToCart(productIdToAdd) {
    var cartItems = localStorage.getItem("cart");
  
    // Check if the product ID to add is already in the cart
    if (cartItems !== null && cartItems.trim() !== "") {
      var existingItems = cartItems.split(",");
      
      if (existingItems.includes(productIdToAdd)) {
        // Product is already in the cart, do not add again
        console.log("Product already in the cart");
        return;
      }
    }
  
    // Add the new product ID to the cart
    var updatedCartItems = cartItems ? `${cartItems},${productIdToAdd}` : productIdToAdd;
    localStorage.setItem("cart", updatedCartItems);
  
    // Update the cart icon with the new count
    addNumberOfItemsToCartIcon();
  }
  
  function removeItemFromCart(productId) {
    var cartItems = localStorage.getItem("cart");
  
    if (cartItems !== null && cartItems.trim() !== "") {
      cartItems = cartItems.split(",");
  
      // Find and remove the selected product ID from the cart
      var index = cartItems.indexOf(productId);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }
  
      // Update the cart in localStorage
      localStorage.setItem("cart", cartItems.join(","));
  
      // Re-render the cart after removing the item
      renderCartItems();
      addNumberOfItemsToCartIcon();
    }
  }
  
  function addNumberOfItemsToCartIcon() {
    var cartButton = document.getElementById("cartbutton");
    var cartItems = localStorage.getItem("cart");
  
    if (cartItems) {
      cartItems = cartItems.split(",");
      var cartItemsCount = cartItems.length; // Count the actual number of products
      cartButton.innerHTML = `cart (${cartItemsCount})`;
    } else {
      cartButton.innerHTML = `cart (0)`;
    }
  }
  
  function updateTotalPriceLabel(total) {
    // Update the total-input field
    var totalInput = document.getElementById("total-input");
    totalInput.value = total.toFixed(1);
  
    // Render the total price after the label
    renderTotalPrice(total);
  }
  
  function updateTotalPrice() {
    var cartItems = localStorage.getItem("cart");
    var total = 0;
  
    if (cartItems !== null && cartItems.trim() !== "") {
      cartItems = cartItems.split(",");
  
      // Use Promise.all to wait for all fetchProductDetails promises to resolve
      Promise.all(cartItems.map(productId => fetchProductDetails(productId)))
        .then(productDetailsArray => {
          // Calculate the total price using the resolved productDetailsArray
          productDetailsArray.forEach(productDetails => {
            if (productDetails) {
              total += parseFloat(productDetails.price);
            }
          });
  
          // Update the total price label
          updateTotalPriceLabel(total);
        })
        .catch(error => {
          console.error("An error occurred while fetching product details:", error.message);
        });
    } else {
      // Update the total-input field for an empty cart
      updateTotalPriceLabel(total);
    }
  }
  
  function renderTotalPrice(total) {
    // Render the total price after the label
    var totalPriceLabel = document.createElement("p");
    totalPriceLabel.innerHTML = `Your Total: ${total.toFixed(1)}`;
    document.body.appendChild(totalPriceLabel); // You can replace document.body with the appropriate container element
  }
  