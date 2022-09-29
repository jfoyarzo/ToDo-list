import './style.css';
import Task from './modules/Task.js';

const localData = JSON.parse(localStorage.getItem('tasks'));
let allTasks;

if (localData) {
  allTasks = localData;
} else {
  allTasks = [];
}

const showTasks = () => {
  const parser = new DOMParser();
  const ul = document.querySelector('.main-list');
  ul.innerHTML = '';
  allTasks.forEach((e) => {
    const liStr = `<li>
    <input type="checkbox" class="checkInput">${e.description}
    <ul class="task-menu">
        <li class="editTask" data-index ="${e.index}">
            <span class="task-menu-text">Edit</span>
            <span class="material-symbols-outlined">
                edit_square
            </span>
        </li>
        <li class="deleTask" data-index ="${e.index}">
            <span class="task-menu-text">Delete</span>
            <span class="material-symbols-outlined">
                delete
            </span>
        </li>
    </ul>
    <span class="material-symbols-outlined menu-btn">
        more_vert
    </span>
    </li>`;
    const li = parser.parseFromString(liStr, 'text/html').body.firstChild;
    li.classList.add('task');
    ul.append(li);
  });
};

const showMenu = (element) => {
  const parent = element.parentElement;
  const ul = parent.children[1];
  ul.classList.add('open-task-menu');
  document.addEventListener('click', (e) => {
    const isClose = e.target.closest('.open-task-menu');
    if (!isClose && ul.classList.contains('open-task-menu')) {
      ul.classList.remove('open-task-menu');
    }
  });
};

const AddTask = () => {
  const desc = document.querySelector('#add-input').value;
  const task = new Task(desc);
  task.index = allTasks.length + 1;
  allTasks.push(task);
  document.querySelector('#add-input').value = '';
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  showTasks();
};

showTasks();
const addBtn = document.getElementById('add-btn');
const menuBtn = document.querySelectorAll('.menu-btn');
menuBtn.forEach((e) => {
  e.addEventListener('click', (ev) => {
    showMenu(ev.target);
  });
});



addBtn.addEventListener('click', AddTask);