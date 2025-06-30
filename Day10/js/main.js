const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.onclick = () => toggleComplete(idx);

        const action = document.createElement('div');
        action.className = 'todo-action';

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => deleteTodo(idx);

        action.appendChild(delBtn);
        li.appendChild(span);
        li.appendChild(action);
        list.appendChild(li);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const value = input.value.trim();
    if (!value) return;
    todos.push({ text: value, completed: false });
    input.value = '';
    renderTodos();
}

function deleteTodo(idx) {
    todos.splice(idx, 1);
    renderTodos();
}

function toggleComplete(idx) {
    todos[idx].completed = !todos[idx].completed;
    renderTodos();
}

addBtn.onclick = addTodo;
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTodo();
});

renderTodos();
