import { useState } from "react";

export default function AddNote({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return; // prevent empty notes
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Write your note description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
