import React, { useContext } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className="todo-app">
        <TodoList />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
