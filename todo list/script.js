
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        content: taskValue,
        completed: false,
    };

    createTaskElement(task);

    saveTaskToLocalStorage(task);

    taskInput.value = '';
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    const span = document.createElement('span');
    span.textContent = task.content;
    if (task.completed) {
        span.classList.add('completed');
    }
    span.addEventListener('click', () => toggleTaskCompletion(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function toggleTaskCompletion(taskId) {
    const task = getTaskFromLocalStorage(taskId);
    task.completed = !task.completed;
    updateTaskInLocalStorage(task);
    renderTasks();
}

function deleteTask(taskId) {
    removeTaskFromLocalStorage(taskId);
    renderTasks();
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function getTaskFromLocalStorage(taskId) {
    const tasks = getTasksFromLocalStorage();
    return tasks.find(task => task.id === taskId);
}

function removeTaskFromLocalStorage(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskInLocalStorage(updatedTask) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    tasks[taskIndex] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => createTaskElement(task));
}

function renderTasks() {
    taskList.innerHTML = '';
    loadTasks();
}
