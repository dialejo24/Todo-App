import { createTodoItem } from "./todo-item";

let todos_list = []; //stores to-do items

function addTodoItem(description) { //add a new todo to todos_list
    let newTodoItem = createTodoItem(description); 
    todos_list.push(newTodoItem);
    return newTodoItem.getId();
}

function removeTodoItem(id) { //remove a todo from todos_list
    todos_list.splice(getTodoItemPosition(id), 1);
}

function changeTodoItemState(id) { //change the state of a todo
    let todoItem = todos_list[getTodoItemPosition(id)];
    todoItem.changeState();
    console.log(todos_list);
    return todoItem.getState();
}

function getTodoItemPosition(id) { //return the index of a todo 
    let position = todos_list.map(todoItem => todoItem.getId()).indexOf(Number(id));
    return position;
}

function getTodosActive() { //return a set of active todos ids
    return filterTodos("active");
}

function getTodosCompleted() { //return a set of completed todos ids
    return filterTodos("completed");
}

function filterTodos(rule) { //return a set of todos ids based on a given rule
    let ids = new Set(todos_list.filter(todoItem => todoItem.getState() == rule).map(todoItem => todoItem.getId()));
    return ids;
}

function clearCompletedTodos() { //remove all completed to-do items from todos_list
    let completedTodosId = filterTodos("completed");
    for (let i = 0; i < todos_list.length; i++) {
        let todoItem = todos_list[i];
        if (todoItem.getState() == "completed") {
            removeTodoItem(todoItem.getId());
            i--;
        }
    }

    console.log(todos_list);
    return completedTodosId;
}

export {addTodoItem, removeTodoItem, changeTodoItemState, getTodosActive, clearCompletedTodos,
getTodosCompleted};
