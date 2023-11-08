const searchParams = new URLSearchParams(window.location.search);

var baseUrl = "";

if(searchParams.has('id')) {
    baseUrl = `https://api.noroff.dev/api/v1/gamehub/${searchParams.get('id')}`;  

}




async function fetchData() {
  try {
    const response = await fetch(`${baseUrl}`);
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    const data = await response.json();
    console.log(data);

    var element = document.getElementById("product");
   
      element.innerHTML = `
        <article>
          <img src="${data.image}">
          <h2>${data.title}</h2>
          <p>${data.description}</p>
        </article>
      `;
  
  

  } catch (error) {
    console.error(error);
  }
}
