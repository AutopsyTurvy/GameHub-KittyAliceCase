// Product.js - The Product details




const apiURLbase = "https://game-hub-kittyalicecase.no";

const productURL = "/wp-json/wc/store/products";

const storeURL = "https://game-hub-kittyalicecase.no/wp-json/wc/store/products";

const imageURL = "https://game-hub-kittyalicecase.no/wp-content/uploads/2024/01/4-assassin-324x324.jpg";


//THUMBNAILS:-----------------------------------------------------------





async function fetchThumbnails() {
  try {
      const response = await fetch(storeURL);
      const getResults = await response.json();
      let htmlContent = '';

      for (var i = 0; i < getResults.length; i++) {
          
          htmlContent += `<img src="${getResults[i].images[0].thumbnail}" alt="Product Thumbnail">`;
      }

      document.getElementById('thumbnail-images').innerHTML = htmlContent;
  }
  catch (error) {
      console.log(error);
  }
}

fetchThumbnails();






//MAIN PAGE PRODUCTS:---------------------------------------------------




//product.js



function redirectToProductInfo(productId) {
  window.open(`../productInfo.html?productId=${productId}`, '_blank');
}

async function fetchProducts() {
  try {
      const response = await fetch(storeURL);
      const getResults = await response.json();
      let htmlContent = '';

      for (var i = 0; i < getResults.length; i++) {
          const product = getResults[i];
          htmlContent += `
              <div class="product">
                  <img src="${product.images[0].src}" alt="Product Image">
                  <div id="wordpress-product-details">
                      <h3>${product.name}</h3>
                      <p>Regular Price: ${product.prices.regular_price} ${product.prices.currency_symbol}</p>
                      <p>Sale Price: ${product.prices.sale_price} ${product.prices.currency_symbol}</p>
                      <p>Currency Code: ${product.prices.currency_code}</p>
                      <button onclick="redirectToProductInfo(${product.id})">More Information</button>
                  </div>
              </div>`;
      }

      document.getElementById('productContainer').innerHTML = htmlContent;
  } catch (error) {
      console.log(error);
  }
}

fetchProducts();




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------






























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