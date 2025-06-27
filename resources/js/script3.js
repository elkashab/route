let logoutBtn = document.querySelector("#logout");
let welcomeElement = document.querySelector("h3");
let userSession = localStorage.getItem("sessionUsername");
welcomeElement.innerText = `Welcome ${userSession}`;

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("sessionUsername");
});
