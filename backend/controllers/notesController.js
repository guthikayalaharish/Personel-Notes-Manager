const Note = require('../models/Note');

// @desc Get all notes
const getNotes = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// @desc Create a note
const createNote = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newNote = new Note({
      title,
      description,
      category,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: "Failed to create note" });
  }
};

// @desc Update a note
const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: "Failed to update note" });
  }
};

// @desc Delete a note
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete note" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
