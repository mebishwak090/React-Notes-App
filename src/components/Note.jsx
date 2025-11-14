import TagList from "./TagList";

export default function Note({ 
  note,
  setSearchTerm,
  selectedTag,
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
  cancelEditing
}) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-200">
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
          <input
            type="text"
            value={editTags.join(", ")}
            onChange={(e) =>
              setEditTags(e.target.value.split(",").map((t) => t.trim()))
            }
            className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Edit tags (comma-separated)"
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
            
            <TagList tags={note.tags} onClickTag={(tag) => setSearchTerm(tag)} selectedTag={selectedTag} className="cursor-pointer" />

            <div className="text-xs text-gray-400 mt-1">
              <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
              {note.updatedAt !== note.createdAt && (
                <p>Edited: {new Date(note.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() =>
                startEditing(note.id, note.title, note.description, note.tags)
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
  );
}
