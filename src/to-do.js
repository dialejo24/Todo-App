import { createTodoItem } from "./todo-item";

let todos_list = []; //stores to-do items

function addTodoItem(description) {
    let newTodoItem = createTodoItem(description); 
    todos_list.push(newTodoItem);
    return newTodoItem.getId();
}

function removeTodoItem(id) {
    todos_list.splice(getTodoItemPosition(id), 1);
}

function changeTodoItemState(id) {
    let todoItem = todos_list[getTodoItemPosition(id)];
    todoItem.changeState();
    console.log(todos_list);
    return todoItem.getState();
}

function getTodoItemPosition(id) {
    let position = todos_list.map(todoItem => todoItem.getId()).indexOf(Number(id));
    return position;
}

function getTodosActive() {
    return todos_list.filter(todoItem => todoItem.getState() == "active").length;
}

function clearCompleted() { //remove all completed to-do items from todos_list
    let completedTodosId = new Set();
    for (let i = 0; i < todos_list.length; i++) {
        let todoItem = todos_list[i];
        if (todoItem.getState() == "completed") {
            removeTodoItem(todoItem.getId());
            completedTodosId.add(todoItem.getId());
            i--;
        }
    }

    console.log(todos_list);
    return completedTodosId;
}

export {addTodoItem, removeTodoItem, changeTodoItemState, getTodosActive, clearCompleted};
