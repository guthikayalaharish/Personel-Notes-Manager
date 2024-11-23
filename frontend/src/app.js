import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/notes?search=${search}`);
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <div>
      <h1>Personal Notes Manager</h1>
      <SearchBar setSearch={setSearch} />
      <NoteForm fetchNotes={fetchNotes} />
      <NoteList notes={notes} fetchNotes={fetchNotes} />
    </div>
  );
};

export default App;
