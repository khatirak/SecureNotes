import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import { getNotes } from "../api";
import { Note } from "../types";

const NotesPage: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Fetch notes
    fetchNotes();
  }, [isAuthenticated, navigate]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      setError("");
    } catch (err) {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="notes-page">
      <div className="header">
        <h1>SecureNotes</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <NoteForm onNoteAdded={fetchNotes} />
          <NoteList notes={notes} />
        </>
      )}
    </div>
  );
};

export default NotesPage;

