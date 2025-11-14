import { useState, useEffect } from "react";

export default function AddNote({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

   // Handle scroll
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20); // shrink after 20px scroll
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return; // prevent empty notes
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    onAdd(title, description, tagArray);
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} 
      className={`
        bg-white rounded-xl shadow-md p-5 mt-5
        flex flex-col gap-4 transition-all duration-300
        ${isScrolled ? "p-3 mt-2" : "p-5 mt-5"}
      `}>
      <h3 className={`text-lg font-semibold text-gray-800 transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"}`}>
        Add a note
      </h3>
      <input
        type="text"
        className="bg-gray-50 px-3 py-1.5 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-gray-300 
          placeholder-gray-500
          border border-transparent
          focus:border-transparent"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="bg-gray-50 px-3 py-1.5 rounded-md resize-none
          focus:outline-none focus:ring-2 focus:ring-gray-300 
          placeholder-gray-500
          border border-transparent
          focus:border-transparent"
        placeholder="Take a note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <input
        type="text"
        className="bg-gray-50 px-3 py-1.5 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-gray-300 
          placeholder-gray-500
          border border-transparent
          focus:border-transparent"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-3 py-1.5 
            text-sm text-gray-700
            border border-gray-300 
            rounded-md
            hover:bg-gray-100
            transition
          "
        >
          Add
        </button>
      </div>
    </form>
  );
}
