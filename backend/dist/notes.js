"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.notesRouter = express_1.default.Router();
// Map to store notes by username
const userNotes = {};
// Get all notes for the authenticated user
exports.notesRouter.get("/", (req, res) => {
    var _a;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    // Return empty array if user has no notes yet
    const notes = userNotes[username] || [];
    res.json(notes);
});
// Add a new note for the authenticated user
exports.notesRouter.post("/", (req, res) => {
    var _a;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const { text } = req.body;
    // Validate input
    if (!text) {
        return res.status(400).json({ message: "Note text is required" });
    }
    const newNote = {
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
