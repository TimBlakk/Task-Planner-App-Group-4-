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
      addTaskToList(taskName, taskDescription, taskAssignedTo, taskDueDate, taskStatus);
      document.getElementById('taskForm').reset();
    } else {
      errorAlert.classList.remove('d-none');
    }
  });
  
  function addTaskToList(name, description, assignedTo, dueDate, status) {
    const taskList = document.getElementById('taskList');
  
    const taskCard = document.createElement('li');
    taskCard.classList.add('list-group-item');
    taskCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><strong>Assigned To:</strong> ${assignedTo}</p>
          <p class="card-text"><strong>Due Date:</strong> ${dueDate}</p>
          <p class="card-text"><strong>Status:</strong> ${status}</p>
        </div>
      </div>
    `;
  
    taskList.appendChild(taskCard);
  }
  