// this script file will check if user is logged in or not
// if not, then redirect to the login page
// if yes, then redirect to the home page

// user the token from the local storage to check if the user is logged in or not
const token = localStorage.getItem("token");
const userid = localStorage.getItem("userid");
const currentPage = window.location.pathname;

// if the token is not present, then redirect to the login page
// if the token is present, then redirect to the home page
// get the user id from the local storage

if (token) {
  const loginButton = document.getElementById("login-button");
  const signupButton = document.getElementById("signup-button");
  loginButton.remove();
  signupButton.remove();

  // add logout button
  // locate the div with classname "links"
  const linksDiv = document.querySelector(".links");
  // create a button element
  // put the logoutButton in that div

  // add profile link
  const profileLink = document.createElement("a");
  profileLink.href = "/profile.html";
  profileLink.innerText = "Profile";
  linksDiv.appendChild(profileLink);

  const logoutButton = document.createElement("button");
  logoutButton.id = "logout-button";
  logoutButton.innerText = "Logout";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    window.location.href = "/pages/login.html";
  });
  linksDiv.appendChild(logoutButton);
} else {
  // token not found
  // if the current page is not login or signup page, then redirect to the login page
  if (
    currentPage !== "/pages/login.html" &&
    currentPage !== "/pages/register.html"
  ) {
    window.location.href = "/pages/login.html";
  }
}
