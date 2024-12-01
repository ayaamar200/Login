var userNameSpan = document.getElementById("userName");
var logoutBtn = document.getElementById("logout")

//! to say welcome in home page
var userName = localStorage.getItem("sessionUserName");
if (userName) {
  userNameSpan.innerHTML = userName;
}


//! for logout
function logout() {
    localStorage.removeItem('sessionUserName')
    window.location = "./index.html";
}

logoutBtn.addEventListener("click",logout)