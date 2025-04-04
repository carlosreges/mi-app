import React, { useEffect, useState } from 'react';
import './TodoNotifications.css';

function TodoNotifications({ todos }) {
  const [permission, setPermission] = useState('default');
  
  useEffect(() => {
    // Comprobar si el navegador soporta notificaciones
    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones");
      return;
    }
    
    // Comprobar permiso actual
    setPermission(Notification.permission);
    
    // Verificar tareas que vencen hoy
    checkDueTasks();
    
    // Configurar un intervalo para verificar cada hora
    const interval = setInterval(checkDueTasks, 3600000);
    
    return () => clearInterval(interval);
  }, [todos]);
  
  const requestPermission = () => {
    Notification.requestPermission().then(perm => {
      setPermission(perm);
      if (perm === "granted") {
        checkDueTasks();
      }
    });
  };
  
  const checkDueTasks = () => {
    if (permission !== "granted") return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    todos.forEach(todo => {
      if (todo.isComplete) return;
      if (!todo.dueDate) return;
      
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      // Si vence hoy
      if (dueDate.getTime() === today.getTime()) {
        new Notification(`¡Tarea para hoy!`, {
          body: `"${todo.text}" vence hoy.`,
          icon: '/logo192.png'
        });
      }
    });
  };
  
  if (permission !== "granted") {
    return (
      <div className="notification-permission">
        <p>Habilita notificaciones para recibir alertas sobre tareas próximas</p>
        <button onClick={requestPermission}>Permitir notificaciones</button>
      </div>
    );
  }
  
  return null;
}

export default TodoNotifications; 