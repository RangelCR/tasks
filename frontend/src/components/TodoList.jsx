import React from 'react';

export default function TodoList({ todos = [], onToggle, onDelete }){
  if(!Array.isArray(todos)) return null;

  return (
    <ul className="todo-list">
      {todos.map(todo => {
        // accept id or fallback to _id for safety
        const id = todo.id ?? todo._id ?? null;
        return (
          <li key={id ?? Math.random()}>
            <label>
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={()=>{
                  if(!id){ console.warn('toggle without id', todo); return; }
                  onToggle(id, todo.completed);
                }}
              />
              <span className={todo.completed ? 'done' : ''}>{todo.text ?? todo.title ?? ''}</span>
            </label>
            <button onClick={()=>{
              if(!id){ console.warn('delete without id', todo); return; }
              onDelete(id);
            }}>Excluir</button>
          </li>
        );
      })}
    </ul>
  );
}
