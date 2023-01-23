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
        // console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function renderItems() {
        let pEl = document.getElementById('todo-tasks-list');
        pEl.innerHTML = '';
        let list = ``;
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
                input.classList.add('form-control', 'form-control-sm', 'w-50')
                input.style.top = '0'
                let i = document.createElement('i')
                i.classList.add('fa-solid', 'fa-rectangle-xmark')
                let i2 = document.createElement('i')
                i2.classList.add('fa-solid', 'fa-check')
                let ibutton = document.createElement('button')
                ibutton.classList.add('cancel-text-btn')
                ibutton.appendChild(i)
                ibutton.addEventListener('click', () => {
                    document.querySelector(`button[data-id="${dataId}"]`).parentElement.children[0].style.display = 'none'
                    syncLocalStorage();
                    renderItems();
                })
                let ibutton2 = document.createElement('button')
                ibutton2.classList.add('update-text-btn')
                ibutton2.appendChild(i2)
                ibutton2.addEventListener('click', () => {
                    if (input.value !== '') {
                        updateText(dataId, input.value)
                        syncLocalStorage()
                        renderItems();
                    }
                    document.querySelector(`button[data-id="${dataId}"]`).parentElement.children[0].style.display = 'none'
                    document.querySelector(`button[data-id="${dataId}"]`).parentElement.querySelector('label[class="control--checkbox"]').children[0] = input.value
                    document.querySelector(`button[data-id="${dataId}"]`).parentElement.querySelector('label[class="control--checkbox"]').style.display = 'block'
                })
                let btn = document.querySelectorAll(`button[data-id="${dataId}"]`)
                let prtElem = btn[0].parentElement.querySelector('label[class="control--checkbox"]')
                prtElem.style.display = 'none'
                div.appendChild(input)
                div.appendChild(ibutton)
                div.appendChild(ibutton2)
                div.style.display = 'flex'
                div.style.gap = '10px'
                div.style.alignItems = 'center'
                item.parentElement.prepend(div)
                btn.forEach(e => {
                    e.style.display = 'none'
                })
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