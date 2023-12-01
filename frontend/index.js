import "./css/home.scss";

const notes = [
  {
    id: 1,
    title: "Note 1",
    body: "This is the body of note 1",
  },
  {
    id: 2,
    title: "Note 2",
    body: "This is the body of note 2",
  },
];

notes.forEach((note) => {
  document.querySelector("#todos").innerHTML += `
    <div class="card">
      <h2>${note.title}</h2>
      <div>${note.body}</div>
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
