let todos_list = []; //stores to-do items

function addTodoItem(description) {
    todos_list.push(description);
}

function removeTodoItem(id) {
    let position = todos_list.map(todoItem => todoItem.getId()).indexOf(id);
    todos_list.splice(position, 1);
}

function clearCompleted() { //remove all completed to-do items from todos_list
    todos_list = todos_list.filter(todoItem => todoItem.getState() == "active");
}
