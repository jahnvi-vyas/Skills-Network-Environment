// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Store tasks
let tasks = [];

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({
            text: taskText,
            completed: false
        });

        taskInput.value = "";
        displayTasks();
    }
}

// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${index}`;
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(index);
        });

        const label = document.createElement("label");
        label.setAttribute("for", `task-${index}`);
        label.textContent = task.text;

        if (task.completed) {
            label.style.textDecoration = "line-through";
            label.style.color = "gray";
        }

        li.appendChild(checkbox);
        li.appendChild(label);

        taskList.appendChild(li);
    });
}

// Toggle completed status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// Allow adding task with Enter key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Initial display
displayTasks();