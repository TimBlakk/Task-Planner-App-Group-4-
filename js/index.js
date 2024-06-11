let currentUser = '';

const taskManager = new TaskManager();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('goToPlanner').addEventListener('click', () => {
        const selectedUser = document.getElementById('userSelect').value;
        currentUser = selectedUser;
        loadUserPage();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            const selectedUser = event.target.getAttribute('data-user');
            currentUser = selectedUser;
            displayTasks();
        });
    });

    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const taskName = document.querySelector('#taskName').value;
        const taskDescription = document.querySelector('#taskDescription').value;
        const taskAssignedTo = document.querySelector('#taskAssignedTo').value;
        const taskDueDate = document.querySelector('#taskDueDate').value;
        const taskStatus = document.querySelector('#taskStatus').value;

        const errorAlert = document.getElementById('errorAlert');

        if (!taskName || !taskDescription || !taskAssignedTo || !taskDueDate || !taskStatus) {
            errorAlert.classList.remove('d-none');
            return;
        }

        errorAlert.classList.add('d-none');

        taskManager.addTask(currentUser, taskName, taskDescription, taskAssignedTo, taskDueDate, taskStatus);

        document.getElementById('taskForm').reset();
        displayTasks();
    });

    document.getElementById('filterStatus').addEventListener('change', function() {
        displayTasks();
    });
});

function loadUserPage() {
    document.querySelector('.welcome-page').classList.add('d-none');
    document.querySelector('.task-page').classList.remove('d-none');
    displayTasks();
}

function displayTasks() {
    const filterStatus = document.getElementById('filterStatus').value;
    const todoTasks = document.getElementById('todoTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const doneTasks = document.getElementById('doneTasks');

    todoTasks.innerHTML = '';
    inProgressTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    const tasks = taskManager.getTasks(currentUser, filterStatus);

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.className = 'list-group-item';
        taskElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">Assigned to: ${task.assignedTo}</small></p>
                    <p class="card-text"><small class="text-muted">Due Date: ${task.dueDate}</small></p>
                    <p class="card-text"><small class="text-muted">Status: ${task.status}</small></p>
                    <button class="btn btn-danger btn-sm delete-task" data-task-id="${task.id}">Delete</button>
                    <button class="btn btn-primary btn-sm edit-task" data-task-id="${task.id}">Edit</button>
                </div>
            </div>
        `;

        if (task.status === 'To Do') {
            todoTasks.appendChild(taskElement);
        } else if (task.status === 'In Progress') {
            inProgressTasks.appendChild(taskElement);
        } else if (task.status === 'Done') {
            doneTasks.appendChild(taskElement);
        }

        taskElement.querySelector('.delete-task').addEventListener('click', function() {
            taskManager.deleteTask(currentUser, task.id);
            displayTasks();
        });

        taskElement.querySelector('.edit-task').addEventListener('click', function() {
            editTask(task);
        });
    });
}

function editTask(task) {
    document.querySelector('#taskName').value = task.name;
    document.querySelector('#taskDescription').value = task.description;
    document.querySelector('#taskAssignedTo').value = task.assignedTo;
    document.querySelector('#taskDueDate').value = task.dueDate;
    document.querySelector('#taskStatus').value = task.status;

    document.getElementById('addTask').classList.add('d-none');
    document.getElementById('saveTask').classList.remove('d-none');

    // Remove existing event listener to prevent multiple bindings
    const saveButton = document.getElementById('saveTask');
    saveButton.replaceWith(saveButton.cloneNode(true));
    
    document.getElementById('saveTask').addEventListener('click', function() {
        taskManager.updateTask(currentUser, task.id, {
            name: document.querySelector('#taskName').value,
            description: document.querySelector('#taskDescription').value,
            assignedTo: document.querySelector('#taskAssignedTo').value,
            dueDate: document.querySelector('#taskDueDate').value,
            status: document.querySelector('#taskStatus').value,
        });
        displayTasks();
        document.getElementById('taskForm').reset();
        document.getElementById('addTask').classList.remove('d-none');
        document.getElementById('saveTask').classList.add('d-none');
    });
}



