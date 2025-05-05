import React from "react";
import { Note } from "../types";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Add your first note!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-text">{note.text}</div>
              <div className="note-timestamp">
                Created: {formatDate(note.timestamp)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;

