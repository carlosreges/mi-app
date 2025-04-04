import React, { useState } from 'react';
import TodoForm from './TodoForm';
import './Todo.css';

function Todo({ todo, completeTodo, deleteTodo, editTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    editTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className={`todo-row ${todo.isComplete ? 'complete' : ''} ${todo.category} priority-${todo.priority}`}>
      <div className="todo-priority-indicator"></div>
      <div onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="todo-info">
        <div className="todo-category-badge">
          {todo.category}
        </div>
        {todo.dueDate && (
          <div className="todo-date-badge">
            {new Date(todo.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      <div className="icons">
        <button onClick={() => setEdit({ 
          id: todo.id, 
          value: todo.text, 
          category: todo.category,
          dueDate: todo.dueDate
        })}>
          Editar
        </button>
        <button onClick={() => deleteTodo(todo.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Todo; 