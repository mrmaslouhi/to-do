// Fetching necessary elements
const taskInputElement = document.querySelector('#task-input');
const tasksContainerElement = document.querySelector('.tasks-container');
const noTasksContainerElement = document.querySelector('.no-tasks-container');
const dialog = document.querySelector('dialog');
const taskPrioritySelectElement = document.querySelector('#task-priority');
const dialogFormElement = document.querySelector('form');
const tableElement = document.querySelector('table');

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
const insertTask = function insertTaskInsideTasksDiv(newTask) {
  const taskHTML = `
        <div style="border: 2px solid blue" class="task-container">
          <input type="checkbox" onchange="checkTask()" /> 
          <p class="task">${newTask.task}</p>
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
    if (tasks[i].task === taskToBeRemovedText) {
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
  const selectElementValue =
    taskPrioritySelectElement.options[taskPrioritySelectElement.selectedIndex];
  if (taskElement.style.textDecoration === 'line-through') {
    taskElement.style.textDecoration = 'none';
  } else {
    taskElement.style.textDecoration = 'line-through';
  }
  if (selectElementValue.style.textDecoration === 'none') {
    selectElementValue.style.textDecoration = 'nonline-through';
  } else {
    selectElementValue.style.textDecoration = 'none';
  }
};

// Populating the tasks container from the local storage
const populate = function insertTasksInsideTasksDiv() {
  const tasks = localStorage.getObj('tasks');
  tasks.forEach((task) => insertTask(task));
};

// Modal dialog functions
const closeDialog = () => dialog.close();
const showDialog = () => dialog.showModal();

// Clicking outsite the dialog closes off the dialog element
dialog.addEventListener('click', (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

// Populating the tasks container using this function
populate();

// Adding a task
dialogFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  if (tasks.length === 0) {
    noTasksContainerElement.setAttribute('hidden', 'hidden');
  }
  const taskText = taskInputElement.value;
  const selectElementValue =
    taskPrioritySelectElement.options[taskPrioritySelectElement.selectedIndex]
      .text;
  const newTask = {
    task: taskText,
    priority: selectElementValue,
  };

  tasks.push(newTask);
  localStorage.setObj('tasks', tasks);
  taskInputElement.value = '';
  insertTask(newTask);
});
