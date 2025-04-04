import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import TodoSearch from './TodoSearch';
import TodoNotifications from './TodoNotifications';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = id => {
    const updatedTodos = [...todos].filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'completed') return todo.isComplete;
      if (filter === 'active') return !todo.isComplete;
      return true;
    })
    .filter(todo => {
      return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isComplete));
  };

  return (
    <div className="todo-container">
      <div className="todo-sidebar">
        <h2>Añadir tarea</h2>
        <TodoForm onSubmit={addTodo} />
      </div>
      
      <div className="todo-main">
        <h1>¿Qué haremos hoy?</h1>
        <div className="todo-controls">
          <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TodoFilter filter={filter} setFilter={setFilter} />
        </div>
        <TodoStats todos={todos} clearCompleted={clearCompleted} />
        <TodoNotifications todos={todos} />
        <div className="todo-items">
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList; 