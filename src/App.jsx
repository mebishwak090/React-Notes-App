import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddNote from "./components/AddNote";
import SearchBar from "./components/SearchBar";
import SortFilter from "./components/SortFilter";
import NoteList from "./components/NoteList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { loadNotes, saveNotes } from "./utils/storage";
import { STORAGE_KEY } from "./constants";

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

  // 🔄 Optional: Export or manually save notes using storage.js
  const handleExport = () => {
    const allNotes = loadNotes("notes");
    console.log("Exporting notes", allNotes);
  };

  const manualSave = () => {
    saveNotes("notes", notes);
  };

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
      <main className="h-[calc(100vh-60px)] grid grid-cols-[250px_1fr] gap-4 p-4 pt-0 max-w-6xl mx-auto">
        {/* ───── LEFT SIDEBAR ───── */}
        <aside className="bg-white p-4 shadow-sm border h-full flex flex-col">
          <Header />
          <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={clearFilters} />
          <nav className="mt-4">
            <h3 className="text-gray-700 font-semibold mb-2 text-sm">Navigation</h3>
            <ul className="space-y-1">
              <li className="text-blue-600 font-medium">📒 Notes</li>
            </ul>
          </nav>
        </aside>
        {/* ───── MAIN CONTENT ───── */}
        <section className="flex flex-col h-full">
          <div className="shrink-0 mb-4 sticky top-0 bg-gray-100 z-20 pb-2">
            <AddNote onAdd={addNote} />
          </div>
          {/* Scrollable notes area */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-gray-800">My Notes</h2>
              <SortFilter 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                clearFilters={clearFilters} 
              />
            </div>
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
          </div>
        </section>
      </main>
    </div>
  );
}
