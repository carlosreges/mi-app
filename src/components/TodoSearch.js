import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="todo-search">
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default TodoSearch; 