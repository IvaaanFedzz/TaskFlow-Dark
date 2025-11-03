import React, { useState, useEffect } from 'react';

export default function TaskList({ token, API }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchTasks(); }, []);

  const fetchTasks = async ()=>{
    setLoading(true);
    const res = await fetch(API + '/tasks', { headers: { Authorization: 'Bearer ' + token } });
    const data = await res.json();
    if(res.ok) setTasks(data);
    else alert('Error cargando tareas');
    setLoading(false);
  };

  const createTask = async (e)=>{
    e.preventDefault();
    const res = await fetch(API + '/tasks', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ title, description })
    });
    if(res.ok){ setTitle(''); setDescription(''); fetchTasks(); }
    else { const d = await res.json(); alert(d.message || 'Error'); }
  };

  const toggleComplete = async (task) => {
    const res = await fetch(API + '/tasks/' + task._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ ...task, completed: !task.completed })
    });
    if(res.ok) fetchTasks(); else alert('Error');
  };

  const remove = async (id) => {
    const res = await fetch(API + '/tasks/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
    if(res.ok) fetchTasks(); else alert('Error eliminando');
  };

  const startEdit = (t) => { setEditing(t); setTitle(t.title); setDescription(t.description || ''); };
  const saveEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(API + '/tasks/' + editing._id, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ ...editing, title, description })
    });
    if(res.ok){ setEditing(null); setTitle(''); setDescription(''); fetchTasks(); } else alert('Error editando');
  };

  const filtered = tasks.filter(t=> filter==='all' ? true : filter==='done' ? t.completed : !t.completed);

  return (
    <div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0}}>Tus tareas</h3>
          <div className="small">{tasks.length} tareas</div>
        </div>
        <div className="controls" style={{marginTop:12}}>
          <div style={{display:'flex',gap:8}}>
            <button className={`ghost`} onClick={()=>setFilter('all')}>Todas</button>
            <button className={`ghost`} onClick={()=>setFilter('pending')}>Pendientes</button>
            <button className={`ghost`} onClick={()=>setFilter('done')}>Completadas</button>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={fetchTasks}>Actualizar</button>
          </div>
        </div>
      </div>

      <div className="tasks">
        <div>
          <div className="card" style={{marginBottom:12}}>
            <h4 style={{marginTop:0}}>Crear / Editar tarea</h4>
            <form onSubmit={editing ? saveEdit : createTask} className="form">
              <input className="input" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} required />
              <textarea className="input" placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)} />
              <div style={{display:'flex',gap:8}}>
                <button className="btn" type="submit">{editing ? 'Guardar' : 'Crear'}</button>
                {editing && <button type="button" className="btn secondary" onClick={()=>{setEditing(null); setTitle(''); setDescription('')}}>Cancelar</button>}
              </div>
            </form>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4 style={{marginTop:0}}>Actividad reciente</h4>
            <div className="small">Últimas acciones y cambios</div>
          </div>
        </div>

        <div>
          {loading ? <div className="card">Cargando...</div> : null}
          {filtered.length === 0 && !loading && <div className="empty card">No hay tareas.</div>}
          <div style={{marginTop:12}}>
            {filtered.map(t => (
              <div key={t._id} className="task">
                <div>
                  <strong>{t.title}</strong>
                  <div className="meta">{t.description}</div>
                  <div className="small">Creada: {new Date(t.createdAt).toLocaleString()}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
                  <button className="ghost" onClick={()=>toggleComplete(t)}>{t.completed ? 'Desmarcar' : 'Completar'}</button>
                  <button className="ghost" onClick={()=>startEdit(t)}>Editar</button>
                  <button className="ghost" onClick={()=>remove(t._id)}>Borrar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
