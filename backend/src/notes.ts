import express from "express";
import { AuthRequest } from "./middleware";

export const notesRouter = express.Router();

// Store notes by username
interface Note {
  id: string;
  text: string;
  timestamp: number;
}

// Map to store notes by username
const userNotes: Record<string, Note[]> = {};

// Get all notes for the authenticated user
notesRouter.get("/", (req: AuthRequest, res) => {
  const username = req.user?.username;
  
  if (!username) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  
  // Return empty array if user has no notes yet
  const notes = userNotes[username] || [];
  res.json(notes);
});

// Add a new note for the authenticated user
notesRouter.post("/", (req: AuthRequest, res) => {
  const username = req.user?.username;
  
  if (!username) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  
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
  
  // Initialize user's notes array if it doesn't exist
  if (!userNotes[username]) {
    userNotes[username] = [];
  }
  
  userNotes[username].push(newNote);
  res.status(201).json(newNote);
});

