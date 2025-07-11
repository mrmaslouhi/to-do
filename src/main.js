// Fetching necessary elements
const taskInputElement = document.querySelector('#task-input');
const tasksContainerElement = document.querySelector('.tasks-container');
const noTasksContainerElement = document.querySelector('.no-tasks-container');

// Modifiying localStorage to simulate storing objects as values
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

// Declaring necessary variables and setting the local storage
let tasks = [];
if (localStorage.tasks) {
  tasks = localStorage.getObj('tasks');
} else {
  localStorage.setObj('tasks', tasks);
}

// Render the no tasks container if there is no tasks
if (tasks.length === 0) {
  noTasksContainerElement.removeAttribute('hidden');
}

// Utility function for inserting newly added tasks inside the tasks container
const insertTask = function insertTaskInsideTasksDiv(task) {
  const taskHTML = `
        <div class="task-container notice">
        <div style="display: flex; align-items: center">
          <input type="checkbox" onchange="checkTask()" /> 
          <p class="task">${task}</p>      
        </div>
          <button class="delete-button" onclick="deleteTask()">Remove</button>
        </div>
      `;
  tasksContainerElement.innerHTML += taskHTML;
};

// Deleting tasks
const deleteTask = function deleteOneTask() {
  const singleTaskContainer = document.querySelector('.task-container');
  const taskToBeRemovedText = document.querySelector('.task').innerHTML;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]=== taskToBeRemovedText) {
      tasks.splice(i, 1);
    }
  }

  if (tasks.length === 0) {
    noTasksContainerElement.removeAttribute('hidden');
    taskCount = 0;
  }

  localStorage.setObj('tasks', tasks);
  singleTaskContainer.remove();
};

// Marking tasks as checked
const checkTask = function checkCompletedTask() {
  const taskElement = document.querySelector('.task');
  if (taskElement.style.textDecoration === 'line-through') {
    taskElement.style.textDecoration = 'none';
  } else {
    taskElement.style.textDecoration = 'line-through';
  }
};

// Populating the tasks container from the local storage
const populate = function insertTasksInsideTasksDiv() {
  const tasks = localStorage.getObj('tasks');
  tasks.forEach((task) => insertTask(task));
};

// Adding a task

const addTask = function addTaskAndSaveIt() {
  if (tasks.length === 0) {
    noTasksContainerElement.setAttribute('hidden', 'hidden');
  }
  const taskText = taskInputElement.value;
  tasks.push(taskText);
  localStorage.setObj('tasks', tasks);
  taskInputElement.value = '';
  insertTask(taskText);
}

// Populating the tasks container using this function
populate();

