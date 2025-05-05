"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.notesRouter = express_1.default.Router();
// In-memory store for notes
let notes = [];
// Get all notes
exports.notesRouter.get("/", (req, res) => {
    res.json(notes);
});
// Add a new note
exports.notesRouter.post("/", (req, res) => {
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
    notes.push(newNote);
    res.status(201).json(newNote);
});
