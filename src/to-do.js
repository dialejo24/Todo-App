import {
  createTodoItem,
  changeState,
  getState,
  getDescription,
  getId,
} from "./todo-item";

let todos_list; //stores to-do items
if (localStorage.getItem("todosList")) {
  todos_list = getDataFromLocalStorage("todosList");
} else {
  todos_list = [];
}

function addTodoItem(description) {
  //add a new todo to todos_list
  let newTodoItem = createTodoItem(description);
  todos_list.push(newTodoItem);
  saveToLocalStorage();
  console.log(getId.call(newTodoItem));
  return getId.call(newTodoItem);
}

function removeTodoItem(id) {
  //remove a todo from todos_list
  todos_list.splice(getTodoItemPosition(id), 1);
  saveToLocalStorage();
}

function changeTodoItemState(id) {
  //change the state of a todo
  let todoItem = todos_list[getTodoItemPosition(id)];
  changeState.call(todoItem);
  console.log(todos_list);
  saveToLocalStorage();
  return getState.call(todoItem);
}

function getTodoItemPosition(id) {
  //return the index of a todo
  let position = todos_list
    .map((todoItem) => getId.call(todoItem))
    .indexOf(Number(id));
  return position;
}

function getTodosActive() {
  //return a set of active todos ids
  return filterTodos("active");
}

function getTodosCompleted() {
  //return a set of completed todos ids
  return filterTodos("completed");
}

function filterTodos(rule) {
  //return a set of todos ids based on a given rule
  let ids = new Set(
    todos_list
      .filter((todoItem) => getState.call(todoItem) == rule)
      .map((todoItem) => getId.call(todoItem))
  );
  return ids;
}

function clearCompletedTodos() {
  //remove all completed to-do items from todos_list
  let completedTodosId = filterTodos("completed");
  for (let i = 0; i < todos_list.length; i++) {
    let todoItem = todos_list[i];
    if (getState.call(todoItem) == "completed") {
      removeTodoItem(getId.call(todoItem));
      i--;
    }
  }

  console.log(todos_list);
  saveToLocalStorage();
  return completedTodosId;
}

function saveToLocalStorage() {
  localStorage.setItem("todosList", JSON.stringify(todos_list));
}

function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getTodosStoredInLocalStorage() {
  //returns the information of every todo stored in localStorage
  if (!localStorage.getItem("todosList")) {
    return [];
  }
  
  let todos = getDataFromLocalStorage("todosList");
  let information = [];
  todos.forEach((todo) => {
    information.push({
      id: getId.call(todo),
      description: getDescription.call(todo),
      state: getState.call(todo),
    });
  });
  return information;
}

export {
  addTodoItem,
  removeTodoItem,
  changeTodoItemState,
  getTodosActive,
  clearCompletedTodos,
  getTodosCompleted,
  getTodosStoredInLocalStorage,
};
