const express = require("express");
const {
  createNote,
  updateNote,
  deleteNote,
  getNotesByUser,
  getNoteById,
} = require("../models/note");
const { authenticate } = require("../middleware/authenticate"); // replace with your authentication middleware

const router = express.Router();

// Get all notes of logged-in user (requires authentication)
router.post("/allnotes", authenticate, async (req, res) => {
  const userId = req.body.userid; // Replace with actual user ID extraction

  console.log("userId in allNotes: ", userId);
  try {
    const notes = await getNotesByUser(userId);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a note (requires authentication)
router.post("/create", authenticate, async (req, res) => {
  const { categoryID, title, createDate, status, body } = req.body;
  const userId = req.body.userId; // Replace with actual user ID extraction

  try {
    const noteId = await createNote(
      userId,
      categoryID,
      title,
      createDate,
      status,
      body
    );
    res.status(201).json({ message: "Note created successfully", noteId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single note
router.get("/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;

  try {
    const note = await getNoteById(noteId);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note (requires authentication)
router.put("/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;
  const { categoryID, title, createDate, status } = req.body;

  try {
    await updateNote(noteId, categoryID, title, createDate, status);
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a note (requires authentication)
router.delete("/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;

  try {
    await deleteNote(noteId);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
