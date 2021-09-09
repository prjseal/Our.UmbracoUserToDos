angular.module("umbraco").controller("UserToDoController", function ($scope, userService) {
    const todoForm = document.querySelector('.user-todo-form');
    const todoInput = document.querySelector('.user-todo-input');
    const todoItemsList = document.querySelector('.user-todo-items');

    let todos = [];

    todoForm.addEventListener('submit', function(event) {
        addTodo(todoInput.value);
    });

    document.getElementById('user-todo-item').addEventListener('keyup', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            addTodo(todoInput.value);
        }
    });

    function addTodo(item) {
        if (item !== '') {
            const todo = {
            id: Date.now(),
            name: item,
            completed: false
            };

            todos.push(todo);
            addToLocalStorage(todos);

            todoInput.value = '';
        }
    }

    function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function(item) {
        const checked = item.completed ? 'checked': null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
        li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button umb-control-tool-icon icon-trash btn-reset"></button>
        `;
        todoItemsList.append(li);
    });

    }

    function addToLocalStorage(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
    }

    function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
        if (reference) {
            todos = JSON.parse(reference);
            renderTodos(todos);
        }
    }

    function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
    }

    function deleteTodo(id) {
        todos = todos.filter(function(item) {
            return item.id != id;
        });

        addToLocalStorage(todos);
    }

    getFromLocalStorage();

    todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
    });
});