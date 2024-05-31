// js/index.js
const taskManager = new TaskManager();

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskAssignedTo = document.querySelector('#taskAssignedTo').value;
    const taskDueDate = document.querySelector('#taskDueDate').value;
    const taskStatus = document.querySelector('#taskStatus').value;

    const errorAlert = document.getElementById('errorAlert');

    if (taskName && taskDescription && taskAssignedTo && taskDueDate && taskStatus) {
        errorAlert.classList.add('d-none');
        taskManager.addTask(taskName, taskDescription, taskAssignedTo, taskDueDate, taskStatus);
        displayTasks();
        document.getElementById('taskForm').reset();
    } else {
        errorAlert.classList.remove('d-none');
    }
});

document.getElementById('taskList').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const taskId = Number(event.target.closest('.list-group-item').dataset.taskId);
        taskManager.deleteTask(taskId);
        displayTasks();
    }

    if (event.target.classList.contains('edit-button')) {
        const taskId = Number(event.target.closest('.list-group-item').dataset.taskId);
        const task = taskManager.getTasks().find(task => task.id === taskId);
        populateForm(task);
        document.getElementById('saveTask').dataset.taskId = taskId;
        document.getElementById('saveTask').classList.remove('d-none');
        document.getElementById('addTask').classList.add('d-none');
    }
});

document.getElementById('saveTask').addEventListener('click', function(event) {
    const taskId = Number(event.target.dataset.taskId);
    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskAssignedTo = document.querySelector('#taskAssignedTo').value;
    const taskDueDate = document.querySelector('#taskDueDate').value;
    const taskStatus = document.querySelector('#taskStatus').value;

    const updatedTask = {
        name: taskName,
        description: taskDescription,
        assignedTo: taskAssignedTo,
        dueDate: taskDueDate,
        status: taskStatus
    };

    taskManager.updateTask(taskId, updatedTask);
    displayTasks();
    document.getElementById('taskForm').reset();
    document.getElementById('saveTask').classList.add('d-none');
    document.getElementById('addTask').classList.remove('d-none');
});

document.getElementById('filterStatus').addEventListener('change', function(event) {
    const filterStatus = event.target.value;
    displayTasks(filterStatus);
});

function displayTasks(filterStatus = '') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    let tasks = taskManager.getTasks();
    if (filterStatus) {
        tasks = taskManager.filterTasks(filterStatus);
    }
    tasks.forEach(task => {
        const taskCard = document.createElement('li');
        taskCard.classList.add('list-group-item');
        taskCard.dataset.taskId = task.id;
        taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><strong>Assigned To:</strong> ${task.assignedTo}</p>
                    <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
                    <p class="card-text"><strong>Status:</strong> ${task.status}</p>
                    <button class="btn btn-danger delete-button">Delete</button>
                    <button class="btn btn-primary edit-button">Edit</button>
                </div>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
}

function populateForm(task) {
    document.querySelector('#taskName').value = task.name;
    document.querySelector('#taskDescription').value = task.description;
    document.querySelector('#taskAssignedTo').value = task.assignedTo;
    document.querySelector('#taskDueDate').value = task.dueDate;
    document.querySelector('#taskStatus').value = task.status;
}
