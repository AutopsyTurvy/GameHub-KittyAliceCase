//cart.js

function addNumberOfItemsToCartIcon() {
    var cartButton = document.getElementById("cartbutton");
    cartButton.innerHTML = `cart (${localStorage.getItem("cart").split(",").length})`
  }
  addNumberOfItemsToCartIcon();