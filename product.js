const searchParams = new URLSearchParams(window.location.search);
const baseUrl = "https://api.noroff.dev/api/v1/gamehub";

async function fetchData() {
  try {
      const response = await fetch(`${baseUrl}/${searchParams.get('id')}`);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || typeof data !== 'object') {
          throw new Error('Invalid data received from the server.');
      }

      var element = document.getElementById("product");

      const isOnSale = data.onSale;
    const displayedPrice = isOnSale ? data.discountedPrice : data.price;


    const priceText = isOnSale
  ? `This item is on sale! Discounted price is: $${data.discountedPrice}`
  : `Price: ${data.price}`;




  const exchangeRate = 11.11;

  const priceInKroner = displayedPrice * exchangeRate;


element.innerHTML = `
  <article id="api-game-container">
      <img src="${data.image}">
      <h2>${data.title}</h2>
      <p>${data.description}</p>

      <div class="details-container">
          <p class="age-rating">Age Rating: ${data.ageRating}</p>
          <p>Genre: ${data.genre}</p>
      </div>

      <p>${priceText} / ${priceInKroner.toFixed(2)} Kroner</p>

      <p>Date of Release: ${data.released}</p>
      <button id="buyButton">Buy Now</button>
  </article>
`;

      var buyButton = document.getElementById("buyButton");
      buyButton.addEventListener("click", function() {
          console.log("Buy button clicked!");
      });

  } catch (error) {

      if (error instanceof TypeError) {
          console.error('There was a network error or the server did not respond.');
      } else {
          console.error(error.message);
      }
  }
}

fetchData();









