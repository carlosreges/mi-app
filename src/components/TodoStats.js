import React from 'react';
import './TodoStats.css';

function TodoStats({ todos, clearCompleted }) {
  const pendingCount = todos.filter(todo => !todo.isComplete).length;
  
  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.isComplete).length;
    const pending = total - completed;
    
    const byCategory = {};
    todos.forEach(todo => {
      if (!byCategory[todo.category]) byCategory[todo.category] = 0;
      byCategory[todo.category]++;
    });
    
    return { total, completed, pending, byCategory };
  };

  const stats = getStats();

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
      <div className="stats-detail">
        <p>Completadas: {stats.completed}</p>
        {Object.entries(stats.byCategory).map(([category, count]) => (
          <p key={category}>{category}: {count}</p>
        ))}
      </div>
    </div>
  );
}

export default TodoStats; 