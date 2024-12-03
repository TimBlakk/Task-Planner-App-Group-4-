class TaskManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('taskManagerUsers')) || {};
    }

    save() {
        localStorage.setItem('taskManagerUsers', JSON.stringify(this.users));
    }

    addTask(user, name, description, assignedTo, dueDate, status) {
        if (!this.users[user]) {
            this.users[user] = [];
        }
        const task = {
            id: Date.now(),
            name,
            description,
            assignedTo,
            dueDate,
            status,
        };
        this.users[user].push(task);
        this.save();
    }

    getTasks(user, status = '') {
        if (!this.users[user]) return [];
        return this.users[user].filter(task => (status ? task.status === status : true));
    }

    deleteTask(user, taskId) {
        if (!this.users[user]) return;
        this.users[user] = this.users[user].filter(task => task.id !== taskId);
        this.save();
    }

    updateTask(user, taskId, updatedTask) {
        if (!this.users[user]) return;
        this.users[user] = this.users[user].map(task => task.id === taskId ? { ...task, ...updatedTask } : task);
        this.save();
    }
}
