export const loadNotes = (key = "notes") => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Failed to load notes:", err);
    return [];
  }
};

export const saveNotes = (key = "notes", notes) => {
  try {
    localStorage.setItem(key, JSON.stringify(notes));
  } catch (err) {
    console.error("Failed to save notes:", err);
  }
};
