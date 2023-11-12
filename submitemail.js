const form = document.querySelector("#emailform");
form.onsubmit = function(event) {
    event.preventDefault();
 
    console.log(event);
};