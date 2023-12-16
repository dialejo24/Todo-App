import './style.css';
import iconMoonUrl from './images/icon-moon.svg';
import iconCrossUrl from './images/icon-cross.svg';
import { addTodoItem, removeTodoItem, changeTodoItemState, getTodosActive, clearCompletedTodos, getTodosCompleted } from './to-do';

const toggleIcon = document.querySelector("img[alt='toggle']");
const textInput = document.querySelector("input[type='text']");
const todoItems = document.querySelector(".todo_items");
const todosActive = document.querySelector(".amount");
const removeCompletedTodos = document.querySelector(".clear_completed");
const allTodos = document.querySelector(".all_todos");
const activeTodos = document.querySelector(".active_todos");
const completedTodos = document.querySelector(".completed_todos");

textInput.addEventListener("keydown", addNewTodo);
removeCompletedTodos.addEventListener("click", deleteCompletedTodos);
allTodos.addEventListener("click", highlightFilter);
activeTodos.addEventListener("click", highlightFilter);
completedTodos.addEventListener("click", highlightFilter);

setImageUrl(toggleIcon, iconMoonUrl);

function setImageUrl(image, url) {
    image.src = url;
}

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
    if (todoState == "completed") {
        e.target.className = "circle circle-filled";
        e.target.nextElementSibling.classList.add("checked");
        
    } else {
        e.target.className = "circle circle-unfilled";
        e.target.nextElementSibling.classList.remove("checked");
    }
    
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
    allTodos.className = "all_todos";
    activeTodos.className = "active_todos";
    completedTodos.className = "completed_todos";

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

function updateTodosActiveCount() { //updates the count of active todos
    todosActive.textContent = getTodosActive().size;
}

function createTodoComponent(description, id) {
    let div = document.createElement("div");
    div.classList.add("todo_item");
    div.setAttribute("data-id", id);

    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    let circle = document.createElement("div");
    circle.className = "circle circle-unfilled";
    circle.setAttribute("data-id", id);
    circle.addEventListener("click", updateTodoState);

    let paragraph = document.createElement("p");
    paragraph.textContent = description;
    paragraph.classList.add("todo_description");

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

}

function descriptionEmpty(description) {
    return description.length == 0;
}