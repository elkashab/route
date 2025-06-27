/*
    Application General Variable Intilization
 */

let allUsers = [];
let allMessages = [
  { name: "Login Successfully" },
  { name: "Email is required" },
  { name: "Password is required" },
  { name: "This user is not registered" },
  { name: "Invalid username or password" },
  { name: "This Email already Registered" },
  { name: "Registered Successfully" },
];

let userEmail = document.querySelector("#userEmail");
let userPassword = document.querySelector("#userPassword");
let loginBtn = document.querySelector("#login");
let errorMsg = document.querySelector("#error-msg");
let userName = "";

/* 
    Application Storage Intilization
        Add all application Messages to Local Storage
        Parse Previous Registered users From Local Storage (if Exists)
*/

localStorage.setItem("allMessages", JSON.stringify(allMessages));

if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

function validateUserLogin() {
  let isValidEmail = 0;
  let isValidLogin = 0;
  if (allUsers.length === 0) {
    return 4;
  } else if (userEmail.value === "") {
    return 1;
  } else if (userPassword.value === "") {
    return 2;
  }

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === userEmail.value.toLowerCase()) {
      isValidEmail = 1;
    }

    if (isValidEmail === 1 && allUsers[i].password === userPassword.value) {
      isValidLogin = 1;
      userName = allUsers[i].name;
    }
  }

  if (isValidEmail === 0) {
    return 3;
  } else if (isValidLogin === 0) {
    return 4;
  } else {
    return 0;
  }
}

loginBtn.addEventListener("click", function () {
  let validateRes = validateUserLogin();

  console.log(validateRes);

  if (allUsers.length === 0) {
    errorMsg.innerText = allMessages[4].name;
    errorMsg.classList.remove("d-none");
  } else if (validateRes > 0) {
    errorMsg.innerText = allMessages[validateRes].name;
    errorMsg.classList.remove("d-none");
  } else {
    errorMsg.innerText = "";
    errorMsg.classList.add("d-none");
    loginBtn.setAttribute("href", "./home.html");
    localStorage.setItem("sessionUsername", userName);
  }
});
