import React from 'react';
import './Todo.css';

function TodoItem({ todo, index, completeTodo, deleteTodo, editTodo }) {
  return (
    <div 
      className={`todo-row ${todo.isComplete ? 'complete' : ''} ${todo.category} priority-${todo.priority} animated-item`}
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="todo-priority-indicator"></div>
      <div onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      {/* resto del código */}
    </div>
  );
}

export default TodoItem; 