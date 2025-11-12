export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
