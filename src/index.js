import './style.css';
import { showTasks, AddTask } from './modules/functions.js';

showTasks();
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', AddTask);