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
    for(var i = 0; i < data.length; i++) {
      element.innerHTML += `
        <article>
          <a href="product.html?id=${data[i].id}">
            <img src="${data[i].image}">
            <h2>${data[i].title}</h2>
            <p>${data[i].description}</p>
          </a>
        </article>
      `;
    }
  

    } catch (error) {
        console.error(error);
    }
}


 
fetchData();
