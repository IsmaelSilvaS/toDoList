'use strict';

/* <label class="todo-item">
    <input type="checkbox">
        <div>teste de item 1</div>
    <input type="button" value="X">
</label> */

// let database = [
//     {'work' : 'Estudar JS', 'status' :''},
//     {'work' : 'Netflix', 'status' : 'checked'},
//     {'work' : 'Estudar PHP', 'status' : ''}
// ];

const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database));

const createItem = (text, status, i) =>{
    const item = document.createElement('label');
    item.classList.add('todo-item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-i = ${i}>
        <div class="todo1">${text}</div>
        <input type="button" value="X" data-i = ${i}>
    `
    document.getElementById('todoList').appendChild(item);
}

const clear = () =>{
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const update = () =>{
    clear()
    const database = getDatabase();
    database.forEach((item, i) => createItem(item.work, item.status, i));
}

const addItem = (event) =>{
    const key = event.key;
    if(key === 'Enter'){
        const database = getDatabase();
        database.push({'work' : event.target.value, 'status' : ''})
        setDatabase(database);
        update()
        event.target.value = '';
    }
}

const deleteItem = (i) =>{
    const database = getDatabase();
    database.splice(i,1);
    setDatabase(database)
    update();
}

const updateItem = (i) =>{
    const database = getDatabase();
    database[i].status = database[i].status === '' ? 'checked' : '';
    setDatabase(database);
    update();
}

const clickItem = (event) =>{
    const element = event.target;
    console.log(element)
    if(element.type === 'button'){
        deleteItem(element.dataset.i);

    }else if(element.type === 'checkbox'){
        updateItem(element.dataset.i)
    }
}

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);

update();