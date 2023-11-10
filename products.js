const baseUrl = "https://api.noroff.dev/api/v1/gamehub";



async function fetchData() {
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }



const data = await response.json();
console.log(data);



var element = document.getElementById("products");
for (var i = 0; i < data.length; i++) {
    const buttonId = `buyButton${i}`;

    element.innerHTML += `
        <article id="api-game-container">
            <a href="product.html?id=${data[i].id}">
                <img id="api-image" src="${data[i].image}">
                <h2>${data[i].title}</h2>
                <p>${data[i].description}</p>
                <div class="extra-info">
                    <p>Genre: ${data[i].genre}</p>
                    <p>Date of Release: ${data[i].released}</p>
                    <button id="${buttonId}" class="buy-button">Buy Now</button>
                </div>
            </a>
        </article>
    `;

    var buyButton = document.getElementById(buttonId);
    buyButton.addEventListener("click", function() {
        window.location.href = `product.html?id=${data[i].id}`;
    });
}


} catch (error) {
    console.error(error);
}
}


 
fetchData();
