import { useState } from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';

export default function App() {
  const [notes, setNotes] = useState([
    { title: 'Sample Note 1', content: 'This is the first note.' },
    { title: 'Sample Note 2', content: 'Another example note.' },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-2">Your Notes</h2>
        <NoteList notes={notes} />
      </main>
    </div>
  );
}
