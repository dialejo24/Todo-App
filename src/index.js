let todos_list = []; //stores to-do items

function addTodoItem(description) {
    todos_list.push(description);
}

function removeTodoItem(id) {
    todos_list.splice(getTodoItemPosition(id), 1);
}

function getTodoItem(id) {
    return todos_list[getTodoItemPosition(id)];
}

function getTodoItemPosition(id) {
    let position = todos_list.map(todoItem => todoItem.getId()).indexOf(id);
    return position;
}

function clearCompleted() { //remove all completed to-do items from todos_list
    todos_list = todos_list.filter(todoItem => todoItem.getState() == "active");
}
