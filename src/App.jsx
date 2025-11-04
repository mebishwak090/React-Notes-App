import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddNote from "./components/AddNote";

const STORAGE_KEY = "notes";

export default function App() {
  // 1️⃣ Initialize state from localStorage
  const [notes, setNotes] = useState(() => {
    // This ensures initial state comes from localStorage only once
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 2️⃣ Save notes whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Add note
  const addNote = (text) => {
    const newNote = { id: Date.now(), text };
    setNotes((prev) => [newNote, ...prev]);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 max-w-xl mx-auto">
        <AddNote onAdd={addNote} />
        <div className="flex flex-col gap-3">
          {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-3 rounded-md shadow-sm border flex justify-between items-center"
            >
              <span>{note.text}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
