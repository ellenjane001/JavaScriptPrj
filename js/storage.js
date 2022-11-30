window.onload = function () {
    let todos = [];
    init();

    function init() {
        todos = JSON.parse(localStorage.getItem('todos')) || []; // OR it with empty array for undefined        
        renderItems();
        bindInputEvents();

    }

    function bindInputEvents() {
        document.getElementById('to-do-input').addEventListener('keypress', function (event) {
            let task = this.value;
            if (event.key === 'Enter') {
                // console.log('ENTER key is pressed');
                createTodo(task);
                syncLocalStorage();
                renderItems();
                this.value = '';
            }
        });

    }

    function createTodo(task) {
        // console.log(task);
        todos.push({
            id: todos.length,
            task: task,
            done: false
        });
    }

    function syncLocalStorage() {
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderItems() {
        let pEl = document.getElementById('todo-tasks-list');
        pEl.innerHTML = '';
        let list = `
        <li class="todo-item">
            <label class="control--checkbox">                    
                <strong>Modify the "Your To Do List" and Add an Edit Feature to
                Modify the task name that are not yet marked as "Done" </strong>
                <input data-id="0" type="checkbox" disabled>
                    <div class="checked-icon"></div>
            </label>            
        </li>`;
        for (var i = 0; i < todos.length; i++) {
            var item = createItemTemplate(todos[i]);
            list += item;
        }
        pEl.innerHTML = list;

        document.querySelectorAll('#todo-tasks-list li button[class="btn remove-todo-btn"]').forEach(function (item) {
            item.addEventListener('click', function (event) {
                let dataId = item.getAttribute('data-id');
                removeItem(dataId);
                syncLocalStorage();
                renderItems();
            });

        });

        document.querySelectorAll('#todo-tasks-list li button[class="btn update-todo-btn"]').forEach(function (item) {
            item.addEventListener('click', function (event) {
                let dataId = item.getAttribute('data-id');
                let div = document.createElement('div')
                let input = document.createElement('input')
                input.type = 'text'
                input.classList.add('form-control')
                input.classList.add('form-control-sm')
                input.classList.add('w-50')
                input.classList.add('position-absolute')
                input.style.top = '0'
                let i = document.createElement('i')
                i.classList.add('fa-solid')
                i.classList.add('fa-rectangle-xmark')
                let btn = document.querySelector(`button[data-id="${dataId}"]`)
                let prtElem = btn.parentElement.querySelector('label[class="control--checkbox"]')
                prtElem.style.display = 'flex'
                prtElem.style.gap = '10px'
                prtElem.appendChild(input)
                prtElem.appendChild(i)
                btn.style.display = 'none'
                // removeItem(dataId);
                // updateText(dataId, 'Hello')
                // syncLocalStorage();
                // renderItems();
            });

        });
        document.querySelectorAll('#todo-tasks-list li input[type="checkbox"]').forEach(function (item) {
            item.addEventListener('click', function (event) {
                let dataId = item.getAttribute('data-id');

                if (item.getAttribute('checked')) {
                    // update the "done" parameter as true
                    item.setAttribute('checked', false);
                    updateItem(dataId, false);
                } else {
                    // update the "done" parameter as false
                    // lagyan ng check
                    item.setAttribute('checked', true);
                    updateItem(dataId, true);
                }
                syncLocalStorage();
                renderItems();
            })
        });
    }

    function createItemTemplate(todo) {
        var item = '<li class="todo-item ' + (todo.done ? 'done' : '') + '">';
        item += '<label class="control--checkbox">';
        item += todo.task;
        item += '<input data-id="' + todo.id + '" type="checkbox" ' + (todo.done ? 'checked' : '') + ' />';
        item += '<div class="checked-icon"></div>';
        item += '</label>';
        item += !todo.done ? '<button data-id="' + todo.id + '" class="btn update-todo-btn"><i class="fa fa-pencil">UPDATE</i></button>' : '';
        item += '<button data-id="' + todo.id + '" class="btn remove-todo-btn"><i class="fa fa-trash">DELETE</i></button>';
        item += '</li>';

        return item;
    }

    function updateItem(id, isDone) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].done = isDone;
                break;
            }
        }
    }

    function removeItem(id) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
            }
        }
    }
    function updateText(id, value) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].task = value
            }
        }
        console.log(todos)
    }

};