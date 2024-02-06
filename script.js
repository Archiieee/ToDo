let tasks = [];


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}

document.getElementById("addTaskBtn").addEventListener("click", function() {
    document.getElementById("taskInput").value = ""; 
    document.getElementById("taskModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("taskModal").style.display = "none";
});

document.getElementById("saveTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() !== "") {
        const task = {
            id: Date.now(),
            task: taskInput
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
        console.log('Task added:', task);
        displayTasks();
        document.getElementById("taskModal").style.display = "none";
    } else {
        console.log('Task input is empty');
    }
});

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.innerHTML = `
            <p>${task.task}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskCard);
    });
}

function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    const newTask = prompt("Edit Task:", taskToEdit.task);
    if (newTask !== null && newTask.trim() !== "") {
        taskToEdit.task = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
        console.log('Task edited:', taskToEdit);
        displayTasks();
    } else {
        console.log('Task edit cancelled or empty');
    }
}

function deleteTask(id) {
    const taskToDelete = tasks.find(task => task.id === id);
    const confirmDelete = confirm(`Are you sure you want to delete "${taskToDelete.task}"?`);
    if (confirmDelete) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
        console.log('Task deleted:', taskToDelete);
        displayTasks();
    } else {
        console.log('Task deletion cancelled');
    }
}