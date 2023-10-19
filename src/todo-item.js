export {createTodoItem};

function createTodoItem(description) {

    return {
        description,
        state : "active",
        changeState,
        getState,
        getDescription,
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