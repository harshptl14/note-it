const registerForm = document.getElementById("register-form"); // Get the register form element

const username = document.getElementById("username"); // Get the username input element
const password = document.getElementById("password"); // Get the password input element
const email = document.getElementById("email"); // Get the email input element

registerForm.addEventListener("submit", async (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Extract user input from form fields
  const usernameValue = username.value;
  const passwordValue = password.value;
  const emailValue = email.value;

  try {
    // Send POST request to register user with provided credentials
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check server response status code
    if (response.status === 201) {
      // Successful registration
      const { token, insertId } = await response.json(); // Extract token and user ID from response
      localStorage.setItem("userid", insertId); // Store user ID in local storage
      localStorage.setItem("token", token); // Store token in local storage

      // store token in the cookie, so that it can be used in the next request and give a name to the cookie as token
      document.cookie = `token=${token}`;
      window.location.href = "/"; // Redirect user to the homepage
    } else {
      // Handle error based on status code
      if (response.status === 409) {
        alert("Email already exists."); // Inform user about existing username or email
      } else {
        alert("An error occurred. Please try again later."); // Generic error message for other server issues
      }
    }
  } catch (error) {
    // Catch any unexpected errors during the process
    console.error(error); // Log error details to console
    alert("An error occurred. Please try again later."); // Inform user about the error
  }
});
