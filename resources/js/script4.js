/*
    Application General Variable Intilization
 */
let user = {};
let allUsers = [];

let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userPassword = document.querySelector("#userPassword");
let signupBtn = document.querySelector("#signup");
let errorMsg = document.querySelector("#error-msg");

let allMessages = JSON.parse(localStorage.getItem("allMessages"));

if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

signupBtn.addEventListener("click", function () {
  let validateRes = validateSignup();

  if (validateRes > 0) {
    errorMsg.innerText = allMessages[validateRes].name;
    errorMsg.classList.remove("d-none");
  } else {
    user = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };

    allUsers.push(user);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    errorMsg.innerText = allMessages[6].name;
    errorMsg.classList.remove("d-none");
    errorMsg.classList.remove("text-danger");
    errorMsg.classList.add("text-success");
  }
});

function validateSignup() {
  if (allUsers.length != 0) {
    for (let i = 0; i < allUsers.length; i++) {
      if (userEmail.value === allUsers[i].email) {
        return 5;
      }
    }
  }
}
