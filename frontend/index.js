import "./css/home.scss";

let notes;

// function to get all the notes from the database, api call
// localhost:3000/notes

const getNotes = async () => {
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

      if (notes[0]) {
        notes.forEach((note) => {
          document.querySelector("#todos").innerHTML += `
        <div class="card">
          <h2>${note.title}</h2>
          <div>${note.body}</div>
        </div>
        `;
        });
      } else {
        document.querySelector("#todos").innerHTML += `
    <p>No notes yet</p>`;
      }
    }
  } catch (error) {
    // Generic error handling
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};
// call this api when the page loads
// try {
//   const response = await fetch("http://localhost:3000/notes/allnotes", {
//     method: "POST",
//     body: JSON.stringify({
//       userid: localStorage.getItem("userid"),
//     }),
//     headers: {
//       Authorization: `${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.status === 200) {
//     // Successful login, extract and store user data
//     const res = await response.json();
//     notes = res;
//   }
// } catch (error) {
//   // Generic error handling
//   console.error(error);
//   alert("An error occurred. Please try again later.");
// }

getNotes();

document.querySelector("#add").addEventListener("click", async () => {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  console.log(title, body);
  // const id = notes.length + 1;
  const date = new Date();
  // notes.push({ id, title, body });

  try {
    const response = await fetch("http://localhost:3000/notes/create", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userid"),
        categoryID: 1,
        title: title,
        body: body,
        createDate: date.toISOString().slice(0, 19).replace("T", " "),
        status: "Pending",
      }),
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const res = await response.json();
      document.querySelector("#todos").innerHTML += `
      <div class="card">
        <h2>${title}</h2>
        <div>${body}</div>
      </div>
  `;
      // getNotes();
      // notes = res;
    }

    document.querySelector("#title").value = "";
    document.querySelector("#body").value = "";
  } catch (error) {
    // Generic error handling
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
});
