// Product.js - The Product details


const searchParams = new URLSearchParams(window.location.search);
const productBaseUrl = "https://api.noroff.dev/api/v1/gamehub";

function fetchProductData() {
  const response = fetch(`${productBaseUrl}/${searchParams.get('id')}`)
    .then(response => response.json())
    .then(data => {
      var element = document.getElementById("product");

      const isOnSale = data.onSale;
      const displayedPrice = isOnSale 
        ? data.discountedPrice 
        : data.price;
  
      const priceText = isOnSale
        ? `This item is on sale! Discounted price is: $${data.discountedPrice}`
        : `Price: ${data.price}`;
  
      const exchangeRate = 11.11;
      const priceInKroner = displayedPrice * exchangeRate;
  
      element.innerHTML = `
        <img src="${data.image}">
        <h2>${data.title}</h2>
        <p>${data.description}</p>

        <div class="genreandagerating">
          <p>Genre: ${data.genre}</p>
          <p>Age Rating: ${data.ageRating}</p>
        </div>

        <p>${priceText} / ${priceInKroner.toFixed(2)} Kr</p>

        <p>Date of Release: ${data.released}</p>
        <a href="#" id="addToCartButton-${data.id}" class="add-to-cart-link">Add to Cart!</a>
      `;

      document.getElementById(`addToCartButton-${data.id}`)
        .addEventListener("click", (e) => {
          addProductToCart(data.id);  // Call your function here
          addNumberOfItemsToCartIcon();
          e.preventDefault();
          return false;
        });
      
      // Add the addProductToCart function here
      function addProductToCart(id) {
        if(localStorage.getItem("cart") === null) {
          localStorage.setItem("cart", id);
        } else {
          var cart = localStorage.getItem("cart").split(",");
          cart.push(id);
          localStorage.setItem("cart", cart.join(","));
        }
      }
    })
    .catch(error => {
      console.error("An error occurred:", error.message);

      var element = document.getElementById("product");
      const errorId = "singleProductError";
      element.innerHTML = `<p id="${errorId}" class='singleProductError'>Oops! An error occurred while fetching the API!</p>`;
    })
    .finally(() => {
      addNumberOfItemsToCartIcon(); 
    });
}

fetchProductData();