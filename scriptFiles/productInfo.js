document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        try {
         
            const response = await fetch(`https://game-hub-kittyalicecase.no/wp-json/wc/store/products/${productId}`);
            const productDetails = await response.json();

      
            const detailsContainer = document.getElementById('focused-product-details');
            detailsContainer.innerHTML = `
                <h3>${productDetails.name}</h3>
                <!-- Add more product details here -->
            `;
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }
});