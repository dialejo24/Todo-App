export { createTodoItem, changeState, getState, getDescription, getId };
let id = localStorage.getItem("id") || 1;

function createTodoItem(description) {
  let todoItem = {
    id: id++,
    description,
    state: "active",
  };
  localStorage.setItem("id", id);
  return todoItem;
}

function changeState() {
  if (this.state == "active") {
    this.state = "completed";
  } else {
    this.state = "active";
  }
}

function getState() {
  return this.state;
}

function getDescription() {
  return this.description;
}

function getId() {
  return this.id;
}
