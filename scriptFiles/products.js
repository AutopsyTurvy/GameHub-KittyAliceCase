//products.js
const baseUrl = "https://api.noroff.dev/api/v1/gamehub";
const element = document.getElementById("products");

async function fetchData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    if (data.length === 0) {
      element.innerHTML = "<p>Oh no! There was an error while we were fetching data! Please try again later!</p>";
    } else {
      element.innerHTML = data.map(item => `
        <article id="api-game-container">
          <a href="./pages/product.html?id=${item.id}">
            <img id="api-image" src="${item.image}">
            <h2>${item.title}</h2>
            <div class="extra-info">
              <p>Genre: ${item.genre}</p>
              <button id="buyButton-${item.id}" class="buy-button">Click for more Info</button>
              <button class="add-to-cart-button" onclick="addToCart('${item.id}')">Add to Cart</button>
            </div>
          </a>
        </article>
      `).join('');
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    const errorMessageContainer = document.createElement("div");
    if (error instanceof TypeError) {
      errorMessageContainer.innerHTML = "<p class='api-error-message'>Oops! An error occurred whilst fetching the API!</p>";
    }

    errorMessageContainer.className = "error-container";
    element.appendChild(errorMessageContainer);
  }
}

function addToCart(productIdToAdd) {
  var cart = localStorage.getItem("cart");

  // Check if the product ID to add is already in the cart
  if (cart !== null && cart.trim() !== "") {
    var existingItems = cart.split(",");
    if (existingItems.includes(productIdToAdd)) {
      // Product is already in the cart, do not add again
      console.log("Product already in the cart");
      return;
    }
  }

  // Add the new product ID to the cart
  var updatedCartItems = cart ? `${cart},${productIdToAdd}` : productIdToAdd;
  localStorage.setItem("cart", updatedCartItems);

  // Update the cart icon with the new count
  addNumberOfItemsToCartIcon();
}

fetchData();