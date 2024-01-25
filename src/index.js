import "./style.css";
import iconMoonUrl from "./images/icon-moon.svg";
import iconCrossUrl from "./images/icon-cross.svg";
import iconSunUrl from "./images/icon-sun.svg";
import {
  addTodoItem,
  removeTodoItem,
  changeTodoItemState,
  getTodosActive,
  clearCompletedTodos,
  getTodosCompleted,
  getTodosStoredInLocalStorage,
} from "./to-do";

const toggleIcon = document.querySelector("img[alt='toggle']");
const textInput = document.querySelector("input[type='text']");
const todoList = document.querySelector(".todo_list");
const todoItems = document.querySelector(".todo_items");
const todosActive = document.querySelector(".amount");
const removeCompletedTodos = document.querySelector(".clear_completed");
const allTodos = document.querySelector(".all_todos");
const activeTodos = document.querySelector(".active_todos");
const completedTodos = document.querySelector(".completed_todos");
const todosFilter = document.querySelector(".todos_filter");
const container = document.querySelector(".container");
const inputCircle = document.querySelector(".input_circle");

textInput.addEventListener("keydown", addNewTodo);
removeCompletedTodos.addEventListener("click", deleteCompletedTodos);
allTodos.addEventListener("click", highlightFilter);
activeTodos.addEventListener("click", highlightFilter);
completedTodos.addEventListener("click", highlightFilter);
toggleIcon.addEventListener("click", changeMode);

setImageUrl(toggleIcon, iconMoonUrl);

function setImageUrl(image, url) {
  image.src = url;
}

(function () {
  let todosInLocalStorage = getTodosStoredInLocalStorage();
  todosInLocalStorage.forEach((todo) => {
    let todoCircle = createTodoComponent(todo.description, todo.id)
      .firstElementChild.firstElementChild;
    switchTodoAspect(todoCircle, todo.state);
  });
  updateTodosActiveCount();
})();

function addNewTodo(e) {
  if (e.key == "Enter" && !descriptionEmpty(e.target.value)) {
    let newTodoItemId = addTodoItem(e.target.value);
    createTodoComponent(e.target.value, newTodoItemId);
    e.target.value = "";
    updateTodosActiveCount();
  }
}

function deleteTodo(e) {
  removeTodoItem(e.target.attributes["data-id"].value);
  todoItems.removeChild(e.target.parentElement.parentElement);
  updateTodosActiveCount();
}

function updateTodoState(e) {
  let todoState = changeTodoItemState(e.target.attributes["data-id"].value);
  switchTodoAspect(e.target, todoState);
  updateTodosActiveCount();
}

function deleteCompletedTodos() {
  let ids = clearCompletedTodos();
  for (let i = 0; i < todoItems.children.length; i++) {
    if (ids.has(Number(todoItems.children[i].attributes["data-id"].value))) {
      todoItems.removeChild(todoItems.children[i]);
      i--;
    }
  }
}

function highlightFilter(e) {
  allTodos.className =
    "all_todos " +
    (toggleIcon.src == iconMoonUrl ? "light-filter" : "dark-filter");
  activeTodos.className =
    "active_todos " +
    (toggleIcon.src == iconMoonUrl ? "light-filter" : "dark-filter");
  completedTodos.className =
    "completed_todos " +
    (toggleIcon.src == iconMoonUrl ? "light-filter" : "dark-filter");

  if (e.target == allTodos) {
    allTodos.className += " highlight_filter";
    showAllTodos();
  } else if (e.target == activeTodos) {
    activeTodos.className += " highlight_filter";
    filterTodos(getTodosActive());
  } else {
    completedTodos.className += " highlight_filter";
    filterTodos(getTodosCompleted());
  }
}

function filterTodos(ids) {
  for (let i = 0; i < todoItems.children.length; i++) {
    if (ids.has(Number(todoItems.children[i].attributes["data-id"].value))) {
      todoItems.children[i].style.display = "grid";
    } else {
      todoItems.children[i].style.display = "none";
    }
  }
}

function showAllTodos() {
  for (let i = 0; i < todoItems.children.length; i++) {
    todoItems.children[i].style.display = "grid";
  }
}

function updateTodosActiveCount() {
  //updates the count of active todos
  todosActive.textContent = getTodosActive().size;
}

function switchTodoAspect(component, todoState) {
  //changes the aspect of a todo based on its state
  if (todoState == "completed") {
    component.className = "circle circle-filled";
    component.nextElementSibling.classList.add("checked");
    component.nextElementSibling.classList.add(
      toggleIcon.src == iconMoonUrl ? "light-checked" : "dark-checked"
    );
  } else {
    component.className =
      "circle " +
      (toggleIcon.src == iconMoonUrl
        ? "light-circle_unfilled"
        : "dark-circle_unfilled");
    component.nextElementSibling.classList.remove("checked");
    component.nextElementSibling.classList.remove(
      toggleIcon.src == iconMoonUrl ? "light-checked" : "dark-checked"
    );
  }
}

function changeMode() {
  //changes the page mode between dark and light
  if (toggleIcon.src == iconMoonUrl) {
    toggleIcon.src = iconSunUrl;
    document.body.className = "body-dark";
    textInput.className = "input-dark";
    todoList.className = "todo_list background-dark shadow-dark";
    todosFilter.className = "todos_filter background-dark shadow-dark";
    container.className = "container bg-mobile-dark";
    inputCircle.className = "input_circle dark_border";
    removeCompletedTodos.className = "clear_completed dark-clear_completed";
    changeHoverColor("dark");
    changeTodoItemsAspect("dark");
  } else {
    toggleIcon.src = iconMoonUrl;
    document.body.className = "body-light";
    textInput.className = "input-light";
    todoList.className = "todo_list background-light shadow-light";
    todosFilter.className = "todos_filter background-light shadow-light";
    container.className = "container bg-mobile-light";
    inputCircle.className = "input_circle light_border";
    removeCompletedTodos.className = "clear_completed light-clear_completed";
    changeHoverColor("light");
    changeTodoItemsAspect("light");
  }
}

function createTodoComponent(description, id) {
  let div = document.createElement("div");
  div.classList.add("todo_item");
  setColor(div, "light-border", "dark-border");
  div.setAttribute("data-id", id);

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let circle = document.createElement("div");
  circle.classList.add("circle");
  setColor(circle, "light-circle_unfilled", "dark-circle_unfilled");
  circle.setAttribute("data-id", id);
  circle.addEventListener("click", updateTodoState);

  let paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("todo_description");
  setColor(paragraph, "light-todo_description", "dark-todo_description");

  let cross = document.createElement("div");
  cross.classList.add("icon_cross");
  let crossIcon = new Image();
  crossIcon.src = iconCrossUrl;
  crossIcon.setAttribute("alt", "cross icon");
  crossIcon.setAttribute("data-id", id);
  crossIcon.addEventListener("click", deleteTodo);

  cross.appendChild(crossIcon);
  wrapper.appendChild(circle);
  wrapper.appendChild(paragraph);

  div.appendChild(wrapper);
  div.appendChild(cross);

  todoItems.appendChild(div);

  return div;
}

function descriptionEmpty(description) {
  return description.length == 0;
}

function setColor(element, lightClass, darkClass) {
  //sets the color of a todoItem element according to dark and light mode
  if (toggleIcon.src == iconMoonUrl) {
    element.classList.add(lightClass);
  } else {
    element.classList.add(darkClass);
  }
}

function changeTodoItemsAspect(mode) {
  //changes the aspect of every todo item between dark and light mode
  for (let i = 0; i < todoItems.children.length; i++) {
    let todoItem = todoItems.children[i];
    todoItem.className =
      "todo_item " + (mode == "dark" ? "dark-border" : "light-border");
    let todoItemCircle = todoItem.firstElementChild.firstElementChild;
    let todoItemDescription = todoItem.firstElementChild.lastElementChild;
    todoItemDescription.className =
      "todo_description " +
      (mode == "dark" ? "dark-todo_description" : "light-todo_description");
    if (todoItemCircle.className.includes("unfilled")) {
      todoItemCircle.className =
        "circle " +
        (mode == "dark" ? "dark-circle_unfilled" : "light-circle_unfilled");
    } else {
      todoItemDescription.classList.add("checked");
      todoItemDescription.classList.add(
        mode == "dark" ? "dark-checked" : "light-checked"
      );
    }
  }
}

function changeHoverColor(mode) {
  //changes de color when hovering a filter according to dark and light mode
  [allTodos, activeTodos, completedTodos].forEach((filter) => {
    filter.classList.remove(mode == "dark" ? "light-filter" : "dark-filter");
    filter.classList.add(mode == "dark" ? "dark-filter" : "light-filter");
  });
}
