// get the email and password from the form
// display the email and password on the page

// --------------- Future work: send this data to the server ---------------
// send it to the server
// if the server returns a success message, redirect to the login page
// if the server returns an error message, display it on the page

// get the email and password from the form
const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

// send it to the server
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get the email and password from the form
  const emailValue = email.value;
  const passwordValue = password.value;

  // send it to the server

  /*  const result = await fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  // if the server returns a success message, redirect to the login page
  // if the server returns an error message, display it on the page
  if (result.status === "ok") {
    window.location.href = "/dashboard";
  } else {
    alert(result.error);
  }

*/

  // display the email and password on the page
  const user = {
    email: emailValue,
    password: passwordValue,
  };

  const userJSON = JSON.stringify(user);
  const userElement = document.getElementById("user");
  userElement.innerHTML = userJSON;
});
