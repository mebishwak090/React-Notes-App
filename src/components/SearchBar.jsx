export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {value && (
        <button
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
      </div>
  );
}