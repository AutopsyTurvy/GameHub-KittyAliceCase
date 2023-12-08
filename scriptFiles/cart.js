//cart.js

function addNumberOfItemsToCartIcon() {
    var cartButton = document.getElementById("cartbutton");
    cartButton.innerHTML = `cart (${getCartItemCount()})`;
    updateCartTotal();
  }
  
  function getCartItemCount() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;
  }
  
  function updateCartTotal() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var total = 0;
  
    cart.forEach(item => {
      total += item.price;
    });
  
    const salesTaxRate = 0.10; 
    const salesTax = total * salesTaxRate;
    const grandTotal = total + salesTax;
 
    document.getElementById("cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
    document.getElementById("sales-tax-input").value = `$${salesTax.toFixed(2)}`;
    document.getElementById("grand-total").innerHTML = `Grand Total: $${grandTotal.toFixed(2)}`;
  }