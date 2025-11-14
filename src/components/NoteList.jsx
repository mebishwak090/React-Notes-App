import Note from "./Note";

export default function NoteList({
  notes,
  editingId,
  startEditing,
  deleteNote,
  saveEdit,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editTags,
  setEditTags,
  cancelEditing,
  debouncedSearch = "",
  setSearchTerm,
}) {
  const filteredNotes = notes.filter((note) => {
    const term = debouncedSearch.toLowerCase();
    return (
      note.title?.toLowerCase().includes(term) ||
      note.description?.toLowerCase().includes(term) ||
      note.tags?.some((t) => t.toLowerCase().includes(term))
    );
  });

  if (filteredNotes.length === 0) {
    return <p className="text-gray-500">No notes found.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {filteredNotes.map((note) => (
        <Note
          key={note.id}
          note={note}
          selectedTag={debouncedSearch} // pass selected tag to highlight 
          setSearchTerm={setSearchTerm}
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
        />
      ))}
    </div>
  );
}
