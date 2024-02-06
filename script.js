let tasks = [];


const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.name} <button onclick="editTask(${index})">Edit</button> <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        tasks.push({ name: taskName });
        saveTasks();
        taskInput.value = '';
        displayTasks();
    }
}

function editTask(index) {
    const newName = prompt('Enter new task name:', tasks[index].name);
    if (newName !== null) {
        tasks[index].name = newName.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
