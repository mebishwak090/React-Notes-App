import React from 'react'

import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <p className="text-gray-700">
          Welcome! Start adding notes soon.
        </p>
      </main>
    </div>
  )
}

export default App;