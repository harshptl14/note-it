// import "./css/home.scss";

// const todosContainer = document.querySelector("#todos");
// const titleInput = document.querySelector("#title");
// const bodyInput = document.querySelector("#body");

// let notes;

// const createNoteElement = (title, body) => {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   card.innerHTML = `
//     <h2>${title}</h2>
//     <div>${body}</div>
//   `;
//   return card;
// };

// const renderNotes = () => {
//   todosContainer.innerHTML = ""; // Clear the container first

//   if (notes && notes.length > 0) {
//     notes.forEach((note) => {
//       const noteElement = createNoteElement(note.title, note.body);
//       todosContainer.appendChild(noteElement);
//     });
//   } else {
//     todosContainer.innerHTML = "<p>No notes yet</p>";
//   }
// };

// const getNotes = async () => {
//   try {
//     const response = await fetch(
//       "https://note-it-server-5vhi.onrender.com/notes/allnotes",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userid: localStorage.getItem("userid"),
//         }),
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status === 200) {
//       const res = await response.json();
//       notes = res;
//       renderNotes();
//     }
//   } catch (error) {
//     console.error(error);
//     alert("An error occurred. Please try again later.");
//   }
// };

// const addNote = async () => {
//   const title = titleInput.value;
//   const body = bodyInput.value;
//   const date = new Date();

//   try {
//     const response = await fetch(
//       "https://note-it-server-5vhi.onrender.com/notes/create",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           userId: localStorage.getItem("userid"),
//           categoryID: 1,
//           title,
//           body,
//           createDate: date.toISOString().slice(0, 19).replace("T", " "),
//           status: "Pending",
//         }),
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status === 201) {
//       const res = await response.json();
//       notes.push({ title, body });
//       const noteElement = createNoteElement(title, body);
//       todosContainer.appendChild(noteElement);
//     }

//     titleInput.value = "";
//     bodyInput.value = "";
//   } catch (error) {
//     console.error(error);
//     alert("An error occurred. Please try again later.");
//   }
// };

// // Event listener for Add button
// document.querySelector("#add").addEventListener("click", addNote);

// // Initial load of notes
// getNotes();

import "./css/home.scss";

const todosContainer = document.querySelector("#todos");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
let notes;
let currentEditingNoteId;

const createNoteElement = (note) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${note.title}</h2>
    <div>${note.body}</div>
    <button class="edit-button" data-note-id="${note.noteID}">Edit</button>
    <button class="delete-button" data-note-id="${note.noteID}">Delete</button>
  `;
  return card;
};

const renderNotes = () => {
  todosContainer.innerHTML = ""; // Clear the container first
  console.log("INSIDE RENDER NOTES", notes);
  if (notes && notes.length > 0) {
    notes.forEach((note) => {
      const noteElement = createNoteElement(note);
      todosContainer.appendChild(noteElement);
    });
  } else {
    todosContainer.innerHTML = "<p>No notes yet</p>";
  }
};

const getNotes = async () => {
  try {
    const response = await fetch(
      "https://note-it-server-5vhi.onrender.com/notes/allnotes",
      {
        method: "POST",
        body: JSON.stringify({
          userid: localStorage.getItem("userid"),
        }),
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const res = await response.json();
      console.log(res, "res");
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
    const response = await fetch(
      "https://note-it-server-5vhi.onrender.com/notes/create",
      {
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
      }
    );

    if (response.status === 201) {
      const res = await response.json();
      console.log(res.note);
      notes.push(res.note);
      const noteElement = createNoteElement(res.note);
      todosContainer.appendChild(noteElement);
      renderNotes();
    }

    titleInput.value = "";
    bodyInput.value = "";
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

const openEditModal = (title, body) => {
  document.getElementById("editTitle").value = title;
  document.getElementById("editBody").value = body;
  document.getElementById("editModal").style.display = "block";
};

const closeEditModal = () => {
  document.getElementById("editModal").style.display = "none";
};

const updateNote = async (noteId, title, body) => {
  try {
    const response = await fetch(
      `https://note-it-server-5vhi.onrender.com/notes/${noteId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          categoryID: 1,
          userID: localStorage.getItem("userid"),
          title: title,
          createDate: new Date().toISOString().slice(0, 19).replace("T", " "),
          status: "Pending",
          body: body,
        }),
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const res = await response.json();

      // const noteIndex = notes.findIndex((note) => note.id == noteId);
      // notes[noteIndex] = res.note;

      const note = notes.find((n) => n.noteID == noteId);
      note.title = res.note.title;
      note.body = res.note.body;
      note.createDate = res.note.createDate;

      renderNotes();
      closeEditModal();
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

const deleteNote = async (noteId) => {
  try {
    console.log("in delete note fun", noteId);
    const response = await fetch(
      `https://note-it-server-5vhi.onrender.com/notes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 204) {
      console.log(notes, "notes");
      // find the note in the notes array and remove it

      const noteIndex = notes.findIndex((note) => note.noteID === noteId);
      console.log(noteIndex, "noteIndex");
      notes.splice(noteIndex, 1);
      console.log(notes, "notes");
      renderNotes();
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

// Event listener for Add button
document.querySelector("#add").addEventListener("click", addNote);

// Event listener for Save Edit button
document.getElementById("saveEdit").addEventListener("click", () => {
  const editedTitle = document.getElementById("editTitle").value;
  const editedBody = document.getElementById("editBody").value;
  updateNote(currentEditingNoteId, editedTitle, editedBody);
});

// Event listener for Edit and Delete buttons on each note
todosContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const noteId = event.target.dataset.noteId;

    console.log("note id", noteId);

    // find the note in the notes using noteID

    // const noteIndex = notes.findIndex((note) => note.noteID === noteId);
    // const note = notes.find((n) => n.noteID === noteId);

    const note = notes.find((n) => n.noteID == noteId);
    // console.log(noteIndex, "noteIndex");
    // const note = notes[noteIndex];
    console.log(note, "note");
    openEditModal(note.title, note.body);
    currentEditingNoteId = noteId;
  } else if (event.target.classList.contains("delete-button")) {
    const noteId = event.target.dataset.noteId;
    console.log("note id", noteId);
    deleteNote(noteId);
  }
});

const closeModal = document.getElementById("closemodal");

closeModal.addEventListener("click", () => {
  closeEditModal();
});

// Initial load of notes
getNotes();
