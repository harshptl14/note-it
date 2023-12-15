// setup for express server
const express = require("express");
const app = express();
// const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const noteRoutes = require("./routes/note-routes");
// setup for dotenv
require("dotenv").config();
// setup for mysql

app.use(express.json());
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});
// app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.use("/notes", noteRoutes);

// app.use("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen("3000", () => {
//   console.log("Server started on port 3000");
// });
