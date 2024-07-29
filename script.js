const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const todo = todoInput.value;
    if (todo) {
        const li = document.createElement('li');
        li.innerText = todo;
        todoList.appendChild(li);
        todoInput.value = '';

        // Add animation here (e.g., fade-in effect)

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });
        li.appendChild(deleteBtn);
    }
});

todoList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
    }
});
