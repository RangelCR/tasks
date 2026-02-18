const API = "/api";

async function fetchTodos() {
  const res = await fetch(`${API}/todos`);
  return res.json();
}

async function addTodo(title) {
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

async function toggleTodo(id, done) {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });
  return res.json();
}

async function deleteTodo(id) {
  await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
}

function updateCounter(todos) {
  const done = todos.filter(t => t.done).length;
  const el = document.getElementById('counter');
  el.innerHTML = `<span>${done}</span> / ${todos.length} concluídas`;
}

function renderTodos(todos) {
  const list = document.getElementById('list');
  updateCounter(todos);

  if (todos.length === 0) {
    list.innerHTML = '<div class="empty">nenhuma tarefa ainda</div>';
    return;
  }

  list.innerHTML = '';
  todos.forEach(todo => {
    const item = document.createElement('div');
    item.className = `todo-item${todo.done ? ' done' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', async () => {
      await toggleTodo(todo.id, checkbox.checked);
      load();
    });

    const title = document.createElement('span');
    title.className = 'todo-title';
    title.textContent = todo.title;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '✕';
    del.addEventListener('click', async () => {
      await deleteTodo(todo.id);
      load();
    });

    item.appendChild(checkbox);
    item.appendChild(title);
    item.appendChild(del);
    list.appendChild(item);
  });
}

async function load() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('titleInput');
  const title = input.value.trim();
  if (!title) return;
  await addTodo(title);
  input.value = '';
  load();
});

load();
