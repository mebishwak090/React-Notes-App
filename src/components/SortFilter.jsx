export default function SortFilter({ sortBy, setSortBy, clearFilters }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      {/* Sorting */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="az">Title A → Z</option>
        <option value="za">Title Z → A</option>
      </select>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md transition"
      >
        Clear
      </button>
    </div>
  );
}
