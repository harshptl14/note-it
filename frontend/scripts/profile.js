// User.js
console.log("hiiii");
document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userid"); // Replace with the actual user ID or retrieve dynamically

  console.log("userId in profile.js: ", userId);
  try {
    const response = await fetch(
      `https://note-it-server-5vhi.onrender.com/users/user/${userId}`
    );
    const userData = await response.json();

    console.log("userData", userData);
    if (response.status === 200) {
      displayUserDetails(userData);
    } else {
      console.error("Error fetching user data:", userData.message);
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
});

function displayUserDetails(user) {
  const userDetailsDiv = document.getElementById("user-details");

  if (user) {
    const userHtml = `
            <p>User ID: ${user.userID}</p>
            <p>Name: ${user.userName}</p>
            <p>Email: ${user.userEmail}</p>
            <!-- Add more details as needed -->
        `;

    userDetailsDiv.innerHTML = userHtml;
  } else {
    userDetailsDiv.innerHTML = "<p>User not found</p>";
  }
}
