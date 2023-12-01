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

  await fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    // check if the response is ok
    // if yes, then store it in the local storgae and redirect to the home page
    // if no, then display the error message on the page
    if (res.status === 200) {
      // put the token and userid in local storage
      res.json().then((data) => {
        console.log(data);
        localStorage.setItem("userid", data.insertId);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      });
    } else {
      alert(res.error);
    }
  });
  // display the email and password on the page
  // const user = {
  //   email: emailValue,
  //   password: passwordValue,
  // };

  // const userJSON = JSON.stringify(user);
  // const userElement = document.getElementById("user");
  // userElement.innerHTML = userJSON;
});
