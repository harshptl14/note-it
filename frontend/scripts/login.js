const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Submit login form
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;

  // Send POST request to authenticate user
  try {
    const response = await fetch(
      "https://note-it-server-5vhi.onrender.com/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      // Successful login, extract and store user data
      const { token, id } = await response.json();
      localStorage.setItem("userid", id);
      localStorage.setItem("token", token);

      // Redirect to the home page
      window.location.href = "/";
    } else if (response.status === 401) {
      // Invalid credentials
      alert("Invalid email or password. Please try again.");
    } else if (response.status === 404) {
      // User not found
      alert("User not found. Please try again.");
    } else {
      // Unknown error
      console.error(error);
      alert("An unknown error occurred. Please try again later.");
    }
  } catch (error) {
    // Generic error handling
    console.error(error);
    alert("An error occurred. Please try again later.");
  }

  // Removed unused code for displaying user data on the page
});
