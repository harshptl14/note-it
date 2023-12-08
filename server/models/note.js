const db = require("./db-connect");

// Create note
const createNote = async (userID, categoryID, title, createDate, status) => {
  try {
    const sql =
      "INSERT INTO Note (userID, categoryID, title, createDate, status) VALUES (?, ?, ?, ?, ?)";
    const params = [userID, categoryID, title, createDate, status];
    const result = await db.query(sql, params);
    console.log("Note created successfully. Note ID:", result.insertId);
    return result.insertId;
  } catch (err) {
    console.error("Error creating note:", err);
    throw err;
  }
};

// Update note
const updateNote = async (
  noteID,
  userID,
  categoryID,
  title,
  createDate,
  status
) => {
  try {
    const sql =
      "UPDATE Note SET userID = ?, categoryID = ?, title = ?, createDate = ?, status = ? WHERE noteID = ?";
    const params = [userID, categoryID, title, createDate, status, noteID];
    await db.query(sql, params);
    console.log("Note updated successfully:", noteID);
  } catch (err) {
    console.error("Error updating note:", err);
    throw err;
  }
};

// Delete note
const deleteNote = async (noteID) => {
  try {
    const sql = "DELETE FROM Note WHERE noteID = ?";
    await db.query(sql, [noteID]);
    console.log("Note deleted successfully:", noteID);
  } catch (err) {
    console.error("Error deleting note:", err);
    throw err;
  }
};

// Get all notes for a user
const getNotesByUser = async (userID) => {
  try {
    const sql = "SELECT * FROM Note WHERE userID = ?";
    const results = await db.query(sql, [userID]);
    console.log("Notes retrieved for user:", results);
    return results;
  } catch (err) {
    console.error("Error retrieving notes for user:", err);
    throw err;
  }
};

// Get note by ID
const getNoteById = async (noteID) => {
  try {
    const sql = "SELECT * FROM Note WHERE noteID = ?";
    const result = await db.query(sql, [noteID]);
    if (result.length) {
      console.log("Note retrieved successfully:", result[0]);
      return result[0];
    }
    console.log("Note not found:", noteID);
    return null;
  } catch (err) {
    console.error("Error retrieving note:", err);
    throw err;
  }
};

// ... (optional: Category model functions)

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNotesByUser,
  getNoteById,
  // ... (optional: Category model exports)
};
