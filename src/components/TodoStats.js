import React from 'react';
import './TodoStats.css';

function TodoStats({ todos, clearCompleted }) {
  const pendingCount = todos.filter(todo => !todo.isComplete).length;
  
  return (
    <div className="todo-stats">
      <div className="todo-count">
        {pendingCount} {pendingCount === 1 ? 'tarea pendiente' : 'tareas pendientes'}
      </div>
      {todos.some(todo => todo.isComplete) && (
        <button className="clear-completed" onClick={clearCompleted}>
          Eliminar completadas
        </button>
      )}
    </div>
  );
}

export default TodoStats; 