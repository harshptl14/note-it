import "./css/home.scss";

let notes;

// function to get all the notes from the database, api call
// localhost:3000/notes

// call this api when the page loads
try {
  const response = await fetch("http://localhost:3000/notes/allnotes", {
    method: "POST",
    body: JSON.stringify({
      userid: localStorage.getItem("userid"),
    }),
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    // Successful login, extract and store user data
    const res = await response.json();
    notes = res;
  }
} catch (error) {
  // Generic error handling
  console.error(error);
  alert("An error occurred. Please try again later.");
}

notes.forEach((note) => {
  document.querySelector("#todos").innerHTML += `
    <div class="card">
      <h2>${note.title}</h2>
    </div>
  `;
});

document.querySelector("#add").addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = notes.length + 1;

  notes.push({ id, title, body });

  document.querySelector("#todos").innerHTML += `
    <div class="card">
      <h2>${title}</h2>
      <div>${body}</div>
    </div>
  `;

  document.querySelector("#title").value = "";
  document.querySelector("#body").value = "";
});
