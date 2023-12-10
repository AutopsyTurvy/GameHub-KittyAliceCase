// Product.js - The Product details



const searchParams = new URLSearchParams(window.location.search);
const productBaseUrl = "https://api.noroff.dev/api/v1/gamehub";

function fetchProductData() {
  var element = document.getElementById("product"); 

  fetch(`${productBaseUrl}/${searchParams.get('id')}`)
    .then(response => response.json())
    .then(data => {
      const isOnSale = data.onSale;
      const displayedPrice = isOnSale ? data.discountedPrice : data.price;

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
          console.log(`Attempting to add product ID: ${data.id}`); 
          addProductToCart(data.id);
          addNumberOfItemsToCartIcon();
          e.preventDefault();
        });
    })
    .catch(error => {
      console.error("An error occurred:", error.message);
      element.innerHTML = `<p class='singleProductError'>Oops! An error occurred while fetching the API!</p>`;
    })
    .finally(() => {
      addNumberOfItemsToCartIcon(); 
    });
}

function addProductToCart(id) {
  console.log("Adding product with ID:", id); 

  if (!id) {
    console.error("Invalid product ID:", id);
    return; 
  }

  var cart = localStorage.getItem("cart");
  if (cart === null || cart === '') {
    localStorage.setItem("cart", id);
    alert("Item has been added to your cart!");
  } else {
    var cartItems = cart.split(",").filter(item => item.trim() !== ''); // Filter out empty strings
    if (!cartItems.includes(id)) {
      cartItems.push(id);
      localStorage.setItem("cart", cartItems.join(","));
      alert("Item has been added to your cart!");
    } else {
      alert("This item is already in your cart!");
    }
  }
}

function addNumberOfItemsToCartIcon() {
  
}

fetchProductData();