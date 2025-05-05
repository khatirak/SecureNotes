import express from "express";
import { AuthRequest } from "./middleware";

export const notesRouter = express.Router();

// In-memory store for notes
let notes: Note[] = [];

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

// Get all notes
notesRouter.get("/", (req: AuthRequest, res) => {
  res.json(notes);
});

// Add a new note
notesRouter.post("/", (req: AuthRequest, res) => {
  const { text } = req.body;
  
  // Validate input
  if (!text) {
    return res.status(400).json({ message: "Note text is required" });
  }
  
  const newNote: Note = {
    id: Date.now().toString(),
    text,
    timestamp: Date.now()
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

