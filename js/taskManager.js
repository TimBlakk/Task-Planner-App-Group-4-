// js/taskManager.js
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate, status = 'TODO') {
        this.currentId++;
        const task = {
            id: this.currentId,
            name,
            description,
            assignedTo,
            dueDate,
            status
        };
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    updateTask(taskId, updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        }
    }

    filterTasks(filterStatus) {
        return this.tasks.filter(task => task.status === filterStatus);
    }

    getTasks() {
        return this.tasks;
    }
}
