import Note from './Note';

export default function NoteList({ notes }) {
  if (notes.length === 0) {
    return <p className="text-gray-500">No notes yet. Add one above!</p>;
  }

  return (
    <div className="mt-4">
      {notes.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </div>
  );
}
