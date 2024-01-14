const baseUrl = "https://game-hub-kittyalicecase.no/wp-json/wp/v2/posts";
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
          <img id="api-image" src="${item.image}">
          <h2>${item.title}</h2>
          <div class="extra-info">
            <p>Genre: ${item.genre}</p>
            <a href="./pages/product.html?id=${item.id}">
              <button id="buyButton-${item.id}" class="buy-button">Click for more Info</button>
            </a>
            <button class="add-to-cart-button" onclick="addToCart('${item.id}', '${item.title}')">Add to Cart</button>
          </div>
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

function addToCart(productIdToAdd, productTitle) {
  var cart = localStorage.getItem("cart");

  if (cart !== null && cart.trim() !== "") {
    var existingItems = cart.split(",");
    if (existingItems.includes(productIdToAdd)) {
      console.log("Product already in the cart");
      return;
    }
  }

  var updatedCartItems = cart ? `${cart},${productIdToAdd}` : productIdToAdd;
  localStorage.setItem("cart", updatedCartItems);

  addNumberOfItemsToCartIcon();

  alert(`${productTitle} has been added to your cart.`);
}

function addNumberOfItemsToCartIcon() {
  var cartButton = document.getElementById("cartbutton");
  var cartItems = localStorage.getItem("cart");

  if (cartItems) {
    cartItems = cartItems.split(",");
    var cartItemsCount = cartItems.length;
    cartButton.innerHTML = `cart (${cartItemsCount})`;
  } else {
    cartButton.innerHTML = `cart (0)`;
  }
}

fetchData();