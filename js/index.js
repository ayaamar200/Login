//!.................. Global Variables ..................//!

// Inputs Elements

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

var signInBtn = document.getElementById("signIn");
var alertMsg = document.getElementById("alertMsg");



//!.................. Global Functions ..................//!

//! Function for checking inputs is empty or not.
function isEmpty() {
  if (userEmailInput.value === "" || userPasswordInput.value === "") {
    return false;
  } else {
    return true;
  }
}

//! Function for user Registration
function signIn() {
  if (isEmpty() === false) {
    alertMsg.classList.add("text-danger");
    alertMsg.innerHTML = "All inputs is required";
  } else {
    var user = {
      email: userEmailInput.value.trim(),
      password: userPasswordInput.value.trim(),
    };
    for (var i = 0; i < usersList.length; i++) {
      if (
        usersList[i].email.toLowerCase() !== user.email.toLowerCase() ||
        usersList[i].password.toLowerCase() !== user.password.toLowerCase()
      ) {
        alertMsg.classList.remove("text-success");
        alertMsg.classList.add("text-danger");
        alertMsg.innerHTML = "incorrect email or password"; 
        break;
      } else {
        alertMsg.classList.remove("text-danger");
        alertMsg.classList.add("text-success");
        alertMsg.innerHTML = "Success";
        localStorage.setItem("sessionUserName", usersList[i].name);
        window.location = "./home.html";
        break;
      }
    }
    clearForm();
  }
}

//! Function for Clear Form
function clearForm() {
  userEmailInput.value = "";
  userPasswordInput.value = "";

  userEmailInput.classList.remove("is-invalid");
  userEmailInput.classList.remove("is-valid");

  userPasswordInput.classList.remove("is-invalid");
  userPasswordInput.classList.remove("is-valid");
}

signInBtn.addEventListener("click", signIn);

//! Data Validation
function validationData(ele) {
  var regex = {
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

userEmailInput.addEventListener("input", function () {
  validationData(userEmailInput);
});

userPasswordInput.addEventListener("input", function () {
  validationData(userPasswordInput);
});
