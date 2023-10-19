export {createTodoItem};
let id = 1;

function createTodoItem(description) {

    return {
        id : id++,
        description,
        state : "active",
        changeState,
        getState,
        getDescription,
        getId,
    };
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