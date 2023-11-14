// get the username, password and email from the form
// Display the username, password and email(user-object) on the page

// --------------- Future work: send this data to the server ---------------
// send the data to the server
// if the server returns a success message, redirect to the login page
// if the server returns an error message, display it on the page

// get the username, password and email from the form
const registerForm = document.getElementById("register-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");

// send the data to the server
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get the username, password and email from the form
  const usernameValue = username.value;
  const passwordValue = password.value;
  const emailValue = email.value;

  // send the data to the server

  /* const result = await fetch("/register", {
    method: "POST",
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
      email: emailValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json()); */

  // if the server returns a success message, redirect to the login page
  // if the server returns an error message, display it on the page

  /*  if (result.status === "ok") {
    window.location.href = "/login";
  } else {
    alert(result.error);
  } */

  // Display the username, password and email(user-object) on the page
  const user = {
    username: usernameValue,
    password: passwordValue,
    email: emailValue,
  };

  const userJSON = JSON.stringify(user);

  const userElement = document.getElementById("user");
  userElement.innerHTML = userJSON;
});
