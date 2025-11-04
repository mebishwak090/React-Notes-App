import { useState } from "react";

export default function AddNote({ onAdd }) {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return; // prevent empty notes
    onAdd(noteText);
    setNoteText(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <textarea
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Write your note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Note
      </button>
    </form>
  );
}
