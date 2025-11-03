import React, { useState } from 'react';

export default function AuthForm({ API, onLogin }){
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e)=>{
    e.preventDefault();
    if(mode === 'login'){
      const res = await fetch(API + '/auth/login', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(res.ok){ onLogin(data.token, data.user); }
      else alert(data.message || 'Error');
    } else {
      const res = await fetch(API + '/auth/register', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if(res.ok){ onLogin(data.token, data.user); }
      else alert(data.message || 'Error');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-panel card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 className="h-title">{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</h3>
          <div className="small">Modo oscuro · TaskFlow</div>
        </div>
        <form className="form" onSubmit={submit}>
          {mode === 'register' && <input className="input" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} required />}
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <button className="btn" type="submit">{mode === 'login' ? 'Entrar' : 'Registrarse'}</button>
            <button type="button" className="btn secondary" onClick={()=>setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}</button>
          </div>
        </form>
      </div>
      <div style={{maxWidth:420}}>
        <div className="card" style={{marginBottom:12}}>
          <h4 style={{margin:0}}>Bienvenido a TaskFlow</h4>
          <p className="small" style={{marginTop:8}}>Organiza tus tareas, colabora y mantente al día. Interfaz oscura moderna y cómoda para el día y la noche.</p>
        </div>
        <div className="card small">
          Tips:
          <ul style={{marginTop:8}}>
            <li>Usa una contraseña segura</li>
            <li>Prueba crear tareas al entrar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
