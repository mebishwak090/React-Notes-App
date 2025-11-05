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

  // ✏️ Editing state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // 2️⃣ Save notes whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // ➕ Add note (now supports title & description)
  const addNote = (title, description) => {
    const newNote = { id: Date.now(), title, description };
    setNotes((prev) => [newNote, ...prev]);
  };

  // 🗑️ Delete note
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // ✏️ Start editing a note
  const startEditing = (id, currentTitle, currentDescription) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
  };

  // 🚫 Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // 💾 Save edited note
  const saveEdit = (id) => {
    if (!editTitle.trim() && !editDescription.trim()) return; // Prevent empty
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, title: editTitle, description: editDescription }
          : note
      )
    );
    cancelEditing();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 max-w-xl mx-auto">
        <AddNote onAdd={addNote} />

        <div className="flex flex-col gap-3 mt-4">
          {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}

          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-3 rounded-md shadow-sm border"
            >
              {editingId === note.id ? (
                // ✏️ Editing mode
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Edit title..."
                    autoFocus
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
                    rows={3}
                    placeholder="Edit description..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(note.id)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 📝 View mode
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">
                      {note.title || "Untitled"}
                    </h3>
                    <p className="text-gray-600">{note.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() =>
                        startEditing(note.id, note.title, note.description)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
