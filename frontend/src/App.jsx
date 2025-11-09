import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList.jsx';
import api from './services/api.js';

export default function App(){
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    const fetchTodos = async () => {
      try {
        const res = await api.get('/');
        console.log('API /api/todos response:', res.data);
        setTodos(res.data);
      } catch(err){
        console.error('Erro ao carregar tarefas:', err);
      }
    };
    fetchTodos();
  },[]);

  const addTodo = async () => {
    if(!text.trim()) return;
    try{
      const res = await api.post('/', { text });
      setTodos(prev => [...prev, res.data]);
      setText('');
    }catch(err){
      console.error('Erro ao adicionar:', err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try{
      const res = await api.put(`/${id}`, { completed: !completed });
      setTodos(prev => prev.map(t => t.id === id ? res.data : t));
    }catch(err){
      console.error('Erro ao atualizar:', err);
    }
  };

  const deleteTodo = async (id) => {
    try{
      await api.delete(`/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    }catch(err){
      console.error('Erro ao excluir:', err);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="form">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Nova tarefa" />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
