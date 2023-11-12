//products.js

const baseUrl = "https://api.noroff.dev/api/v1/gamehub";
const element = document.getElementById("products");

async function fetchData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    if (data.length === 0) {
      element.innerHTML = "<p>No data available</p>";
    } else {
      element.innerHTML = data.map((item, i) => `
        <article id="api-game-container">
          <a href="product.html?id=${item.id}">
            <img id="api-image" src="${item.image}">
            <h2>${item.title}</h2>
            <div class="extra-info">
              <p>Genre: ${item.genre}</p>
              <button id="buyButton${i}" class="buy-button">Click for more Info</button>
            </div>
          </a>
        </article>
      `).join('');

      data.forEach((item, i) => addEventListenerToBuyButton(`buyButton${i}`, item.id));
    }



  } catch (error) {
    console.error("An error occurred:", error.stack);
    const errorMessageContainer = document.createElement("div");
    if (error instanceof TypeError) {
      errorMessageContainer.innerHTML = "<p class='api-error-message'>Oops! An error occurred whilst fetching the API!</p>";
    }

    errorMessageContainer.className = "error-container";
    element.appendChild(errorMessageContainer);
  }
}




function addEventListenerToBuyButton(buttonId, productId) {

  document.getElementById(buttonId).addEventListener("click", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    window.location.href = `product.html?id=${productId}`;
});
}



function showLoading() {
  document.getElementById("loading").style.display = "block";
}
showLoading();

fetchData();