//cart.js


document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();
    addNumberOfItemsToCartIcon();
});

function renderCartItems() {
    var cartItems = localStorage.getItem("cart");
    var cartContainer = document.getElementById("cart-container");

    
    cartContainer.innerHTML = '';

    if (cartItems) {
        cartItems = cartItems.split(",");
        if (cartItems.length === 0 || (cartItems.length === 1 && cartItems[0] === '')) {
      
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cartItems.forEach(function (productId) {
            fetchProductDetails(productId).then(function (productDetails) {
                renderProductInCart(cartContainer, productDetails);
            });
        });
    } else {

        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
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
    if (productDetails) {
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

function addNumberOfItemsToCartIcon() {
    var cartButton = document.getElementById("cartbutton");
    var cartItemsCount = localStorage.getItem("cart");

    cartButton.innerHTML = `cart (${cartItemsCount ? cartItemsCount.split(",").length : 0})`;
}

function removeItemFromCart(productId) {
    var cartItems = localStorage.getItem("cart");
    if (cartItems) {
        cartItems = cartItems.split(",");
        cartItems = cartItems.filter(item => item !== productId);
        localStorage.setItem("cart", cartItems.join(","));
        
        renderCartItems();
        addNumberOfItemsToCartIcon();
    }
}