import './style.css';
import { showTasks, AddTask } from './modules/functions.js';
import { clearCompleted } from './modules/statusUpdate.js';

showTasks();
const addBtn = document.getElementById('add-btn');
const clearBtn = document.querySelector('.clear');
addBtn.addEventListener('click', AddTask);
clearBtn.addEventListener('click', (ev) => {
  ev.stopImmediatePropagation();
  const array = JSON.parse(localStorage.getItem('tasks'));
  clearCompleted(array);
  window.location.reload();
});
