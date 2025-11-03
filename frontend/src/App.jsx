import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import TaskList from './components/TaskList';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleLogin = (token, user)=>{
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = ()=>{
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="logo">TaskFlow</div>
        <nav>
          <button className="nav-btn active">Tareas</button>
          <button className="nav-btn">Proyectos</button>
          <button className="nav-btn">Estadísticas</button>
        </nav>
        <div className="sidebar-foot">v1 · Dark UI</div>
      </aside>

      <main className="main">
        {!token ? (
          <AuthForm API={API} onLogin={handleLogin} />
        ) : (
          <div className="main-inner">
            <header className="main-header">
              <h2>Hola, {user?.name}</h2>
              <div>
                <button className="ghost" onClick={handleLogout}>Salir</button>
              </div>
            </header>
            <TaskList token={token} API={API} />
          </div>
        )}
      </main>
    </div>
  );
}
