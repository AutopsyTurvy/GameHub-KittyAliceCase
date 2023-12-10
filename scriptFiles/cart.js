//cart.js

function renderCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = localStorage.getItem('cart') ? localStorage.getItem('cart').split(',') : [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(id => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `Product ID: ${id}`;
            cartContainer.appendChild(itemElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    renderCartItems();
});