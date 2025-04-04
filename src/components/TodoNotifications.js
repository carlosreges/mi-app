import React, { useEffect, useState } from 'react';
import './TodoNotifications.css';

function TodoNotifications({ todos }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Buscar tareas que vencen en menos de 24 horas
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const urgent = todos.filter(todo => {
      if (!todo.dueDate || todo.isComplete) return false;
      const dueDate = new Date(todo.dueDate);
      return dueDate >= today && dueDate <= tomorrow;
    });
    
    setNotifications(urgent);
  }, [todos]);
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="notifications-container">
      <h3>Tareas próximas a vencer:</h3>
      <ul className="notification-list">
        {notifications.map(todo => (
          <li key={todo.id} className={`notification priority-${todo.priority}`}>
            {todo.text} - Vence {new Date(todo.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoNotifications; 