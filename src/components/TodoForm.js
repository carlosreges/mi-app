import React, { useState, useEffect, useRef } from 'react';
import './TodoForm.css';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [category, setCategory] = useState(props.edit && props.edit.category ? props.edit.category : 'personal');
  const [dueDate, setDueDate] = useState(props.edit && props.edit.dueDate ? props.edit.dueDate : '');
  const [priority, setPriority] = useState(props.edit && props.edit.priority ? props.edit.priority : 'media');
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleDateChange = e => {
    setDueDate(e.target.value);
  };

  const handlePriorityChange = e => {
    setPriority(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    props.onSubmit({
      id: props.edit ? props.edit.id : Math.floor(Math.random() * 10000),
      text: input,
      category: category,
      dueDate: dueDate,
      priority: priority,
      isComplete: false
    });

    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Actualizar tarea"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="todo-category"
          >
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="estudio">Estudio</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="todo-date"
          />
          <select 
            value={priority} 
            onChange={handlePriorityChange}
            className="todo-priority"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button className="todo-button edit">Actualizar</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Añadir una tarea"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="todo-category"
          >
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="estudio">Estudio</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="todo-date"
          />
          <select 
            value={priority} 
            onChange={handlePriorityChange}
            className="todo-priority"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button className="todo-button">Añadir</button>
        </>
      )}
    </form>
  );
}

export default TodoForm; 