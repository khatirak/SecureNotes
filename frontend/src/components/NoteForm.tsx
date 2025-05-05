import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../api";
import { AuthContext } from "../context/AuthContext";

interface NoteFormProps {
  onNoteAdded: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteAdded }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Note cannot be empty");
      return;
    }

    try {
      await addNote(text);
      setText("");
      setError("");
      setSuccess("Note added successfully!");
      onNoteAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Authentication error. Please log in again.");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          logout();
          navigate("/");
        }, 2000);
      } else {
        setError("Failed to add note");
      }
    }
  };

  return (
    <div className="note-form">
      <h3>Add New Note</h3>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your note..."
            rows={4}
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;

