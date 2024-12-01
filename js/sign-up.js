//!.................. Global Variables ..................//!

// Inputs Elements

var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPasswordInput = document.getElementById("userPassword");
var usersList = [];

// ! Retrieve Users
if (localStorage.getItem("usersContainer") !== null) {
  usersList = JSON.parse(localStorage.getItem("usersContainer"));
}

// console.log(userNameInput,
//     userEmailInput,
//     userPasswordInput
// );

var signUpBtn = document.getElementById("signUp");
var alertMsg = document.getElementById("alertMsg");

//!.................. Global Functions ..................//!

//! Function for checking inputs is empty or not.
function isEmpty() {
  if (
    userNameInput.value === "" ||
    userEmailInput.value === "" ||
    userPasswordInput.value === ""
  ) {
    return false;
  } else {
    return true;
  }
}

//! Function for checking email is exist or not.
function isEmailExist() {
  for (var i = 0; i < usersList.length; i++) {
    if (
      usersList[i].email.toLowerCase() === userEmailInput.value.toLowerCase()
    ) {
      return false;
    }
  }
}

//! Function for user Registration
function signUp() {
  if (isEmpty() === false) {
    alertMsg.classList.add("text-danger");
    alertMsg.innerHTML = "All inputs is required";
  } else {
    if (
      validationData(userNameInput) &&
      validationData(userEmailInput) &&
      validationData(userPasswordInput)
    ) {
      var user = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim(),
        password: userPasswordInput.value.trim(),
      };

      if (usersList.length === 0) {
        usersList.push(user);
        localStorage.setItem("usersContainer", JSON.stringify(usersList));
        alertMsg.classList.add("text-success");
        alertMsg.innerHTML = "Success";
        window.location = "./index.html";
        clearForm();
      } else if (isEmailExist() === false) {
        alertMsg.classList.add("text-danger");
        alertMsg.innerHTML = "email already exists";
      } else {
        usersList.push(user);
        localStorage.setItem("usersContainer", JSON.stringify(usersList));
        alertMsg.classList.add("text-success");
        alertMsg.innerHTML = "Success";
        window.location = "./index.html";
        clearForm();
      }
    }
  }
}

//! Function for Clear Form
function clearForm() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";

  userNameInput.classList.remove("is-invalid");
  userNameInput.classList.remove("is-valid");

  userEmailInput.classList.remove("is-invalid");
  userEmailInput.classList.remove("is-valid");

  userPasswordInput.classList.remove("is-invalid");
  userPasswordInput.classList.remove("is-valid");
}

signUpBtn.addEventListener("click", signUp);

//! Data Validation
function validationData(ele) {
  var regex = {
    userName: /^[a-zA-Z][a-zA-Z\d_ ]{3,30}$/,
    userEmail: /^[^@]+@[^@]+\.[^@]+$/,
    userPassword:
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };

  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    return false;
  }
}

userNameInput.addEventListener("input", function () {
  validationData(userNameInput);
});

userEmailInput.addEventListener("input", function () {
  validationData(userEmailInput);
});

userPasswordInput.addEventListener("input", function () {
  validationData(userPasswordInput);
});
