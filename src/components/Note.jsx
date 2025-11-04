export default function Note({ note }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
      <p className="text-gray-600 mt-2">{note.content}</p>
    </div>
  );
}
