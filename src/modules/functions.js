import Task from './Task.js';
import { setStatus } from './statusUpdate.js';

const localData = JSON.parse(localStorage.getItem('tasks'));

let allTasks;

if (localData) {
  allTasks = localData;
} else {
  allTasks = [];
}

const showMenu = (element) => {
  const parent = element.parentElement;
  const ul = parent.children[2];
  ul.classList.add('open-task-menu');
  const newUl = document.querySelector('.open-task-menu');
  window.addEventListener('mouseup', (e) => {
    const isClose = e.target.closest('.open-task-menu');
    if (!isClose && newUl.classList.contains('open-task-menu')) {
      newUl.classList.remove('open-task-menu');
    }
  });
};

const showTasks = () => {
  const parser = new DOMParser();
  const ul = document.querySelector('.main-list');
  ul.innerHTML = '';
  let liStr = '';
  allTasks.forEach((e, i) => {
    if (e.completed === true) {
      liStr = `<li>
        <input type="checkbox" class="checkInput" id="input${i}" data-index ="${i}" checked><label for="input${i}">${e.description}</label>
        <ul class="task-menu">
            <li class="editTask" data-index ="${i}">
                <span class="task-menu-text">Edit</span>
                <span class="material-symbols-outlined">
                    edit_square
                </span>
            </li>
            <li class="deleteTask" data-index ="${i}">
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
    } else {
      liStr = `<li>
        <input type="checkbox" class="checkInput" id="input${i}" data-index ="${i}"><label for="input${i}">${e.description}</label>
        <ul class="task-menu">
            <li class="editTask" data-index ="${i}">
                <span class="task-menu-text">Edit</span>
                <span class="material-symbols-outlined">
                    edit_square
                </span>
            </li>
            <li class="deleteTask" data-index ="${i}">
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
    }
    const li = parser.parseFromString(liStr, 'text/html').body.firstChild;
    li.classList.add('task');
    ul.append(li);
  });
  const editBtn = document.querySelectorAll('.editTask');
  const updateBtn = document.querySelector('#edit-btn');
  const addInput = document.querySelector('#add-input');
  const menuBtn = document.querySelectorAll('.menu-btn');
  const deleteBtn = document.querySelectorAll('.deleteTask');
  const inputs = document.querySelectorAll('input');

  inputs.forEach((e) => {
    e.addEventListener('change', (ev) => {
      ev.stopImmediatePropagation();
      const { index } = ev.target.dataset;
      setStatus(allTasks, index);
      showTasks();
    });
  });

  menuBtn.forEach((e) => {
    e.addEventListener('click', (ev) => {
      showMenu(ev.target);
    });
  });

  editBtn.forEach((e) => {
    e.addEventListener('click', (ev) => {
      ev.stopImmediatePropagation();
      const closest = ev.target.closest('[data-index]');
      const { index } = closest.dataset;
      const selectedTask = allTasks[index];
      addInput.value = selectedTask.description;
      document.querySelector('#add-btn').classList.add('hidden');
      updateBtn.classList.remove('hidden');
      updateBtn.setAttribute('data-index', index);
      showTasks();
    });
  });

  deleteBtn.forEach((e) => {
    e.addEventListener('click', (ev) => {
      const closest = ev.target.closest('[data-index]');
      const { index } = closest.dataset;
      allTasks.splice(index, 1);
      allTasks.forEach((e, i) => {
        e.index = i + 1;
      });
      localStorage.setItem('tasks', JSON.stringify(allTasks));
      showTasks();
    });
  });

  updateBtn.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const newDesc = addInput.value;
    const { index } = e.target.dataset;
    const selectedTask = allTasks[index];
    selectedTask.description = newDesc;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    addInput.value = '';
    updateBtn.classList.add('hidden');
    document.querySelector('#add-btn').classList.remove('hidden');
    showTasks();
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

export { showTasks, AddTask };