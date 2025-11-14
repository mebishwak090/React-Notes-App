import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddNote from "./components/AddNote";
import SearchBar from "./components/SearchBar";
import SortFilter from "./components/SortFilter";
import Note from "./components/Note";
import NoteList from "./components/NoteList";
import { useLocalStorage } from "./hooks/useLocalStorage";


const STORAGE_KEY = "notes";

export default function App() {
  // 1️⃣ Initialize state from localStorage
  
  const [notes, setNotes] = useLocalStorage("notes", []);

  // ✏️ Editing state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTags, setEditTags] = useState([]); 
  // 🔍 Search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  //Sort
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300); // 300ms delay for debouncing

  return () => clearTimeout(handler); // cleanup previous timeout
}, [searchTerm]);


  // 2️⃣ Save notes whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  //Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
  };

  // ➕ Add note (now supports title & description)
  const addNote = (title, description, tags = []) => {
    const now = new Date().toISOString();
    const newNote = {
    id: Date.now(),
    title,
    description,
    tags,
    createdAt: now,
    updatedAt: now,
  };
    setNotes((prev) => [newNote, ...prev]);
  };

  // 🗑️ Delete note (with confirmation)
  const deleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    const confirmed = window.confirm(
      `Are you sure you want to delete "${noteToDelete?.title || "this note"}"?`
    );
    if (!confirmed) return;

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // ✏️ Start editing a note
  const startEditing = (id, currentTitle, currentDescription, currentTags = []) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
    setEditTags(currentTags);
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
    const now = new Date().toISOString();
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, title: editTitle, description: editDescription, tags: editTags, updatedAt: now }
          : note
      )
    );
    cancelEditing();
  };

  // Sorting notes
  const sortedNotes = [...notes].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 max-w-xl mx-auto">
        <AddNote onAdd={addNote} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <SortFilter 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          clearFilters={clearFilters} 
        />
        <NoteList
          notes={sortedNotes}
          editingId={editingId}
          startEditing={startEditing}
          deleteNote={deleteNote}
          saveEdit={saveEdit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          editTags={editTags}
          setEditTags={setEditTags}
          cancelEditing={cancelEditing}
          debouncedSearch={debouncedSearch}
          setSearchTerm={setSearchTerm}
        />
      </main>
    </div>
  );
}
