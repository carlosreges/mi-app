import React, { useEffect, useState } from 'react';

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
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '15px',
        margin: '15px auto',
        borderRadius: '8px',
        width: '90%',
        textAlign: 'center'
      }}>
        <p style={{ marginBottom: '10px', color: '#fff' }}>
          Habilita notificaciones para recibir alertas sobre tareas próximas
        </p>
        <button 
          onClick={requestPermission}
          style={{
            background: 'linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Permitir notificaciones
        </button>
      </div>
    );
  }
  
  return null;
}

export default TodoNotifications; 