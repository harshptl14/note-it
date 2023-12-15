import "./css/home.scss";

const todosContainer = document.querySelector("#todos");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");

let notes;

const createNoteElement = (title, body) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${title}</h2>
    <div>${body}</div>
  `;
  return card;
};

const renderNotes = () => {
  todosContainer.innerHTML = ""; // Clear the container first

  if (notes && notes.length > 0) {
    notes.forEach((note) => {
      const noteElement = createNoteElement(note.title, note.body);
      todosContainer.appendChild(noteElement);
    });
  } else {
    todosContainer.innerHTML = "<p>No notes yet</p>";
  }
};

const getNotes = async () => {
  try {
    const response = await fetch("http://localhost:3000/notes/allnotes", {
      method: "POST",
      body: JSON.stringify({
        userid: localStorage.getItem("userid"),
      }),
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const res = await response.json();
      notes = res;
      renderNotes();
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

const addNote = async () => {
  const title = titleInput.value;
  const body = bodyInput.value;
  const date = new Date();

  try {
    const response = await fetch("http://localhost:3000/notes/create", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userid"),
        categoryID: 1,
        title,
        body,
        createDate: date.toISOString().slice(0, 19).replace("T", " "),
        status: "Pending",
      }),
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      const res = await response.json();
      notes.push({ title, body });
      const noteElement = createNoteElement(title, body);
      todosContainer.appendChild(noteElement);
    }

    titleInput.value = "";
    bodyInput.value = "";
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

// Event listener for Add button
document.querySelector("#add").addEventListener("click", addNote);

// Initial load of notes
getNotes();
