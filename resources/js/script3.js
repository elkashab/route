let welcomeElement = document.querySelector("h3");
let userSession = localStorage.getItem("sessionUsername");
welcomeElement.innerText = `Welcome ${userSession}`;
