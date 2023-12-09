// Product.js - The Product details



const searchParams = new URLSearchParams(window.location.search);
const productBaseUrl = "https://api.noroff.dev/api/v1/gamehub";

function fetchProductData() {
  let element = document.getElementById("product"); 

  const response = fetch(`${productBaseUrl}/${searchParams.get('id')}`)
    .then(response => response.json())
    .then(data => {

      const isOnSale = data.onSale;
      const displayedPrice = isOnSale ? data.discountedPrice : data.price;



      document.getElementById(`addToCartButton-${data.id}`)
        .addEventListener("click", (e) => {
          addProductToCart(data.id);
          addNumberOfItemsToCartIcon();
          e.preventDefault();
          return false;
        });

      function addProductToCart(id) {
        if (localStorage.getItem("cart") === null) {
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


      element = document.getElementById("product");
      const errorId = "singleProductError";
      if (element) {
        element.innerHTML = `<p id="${errorId}" class='singleProductError'>Oops! An error occurred while fetching the API!</p>`;
      } else {
        console.error("Element is null. Unable to display error message.");
      }
    })
    .finally(() => {
      addNumberOfItemsToCartIcon();
    });
}

fetchProductData();