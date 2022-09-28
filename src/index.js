import './style.css';

const allTasks = [
  {
    description: 'Wash clothes',
    completed: false,
    index: 0,
  },
  {
    description: 'Feed Pets',
    completed: false,
    index: 1,
  },
  {
    description: 'Set up Project',
    completed: false,
    index: 2,
  },
];

const showTasks = () => {
  allTasks.forEach((e) => {
    const parser = new DOMParser();
    const ul = document.querySelector('.main-list');
    const liStr = `<li>
    <input type="checkbox" class="checkInput">${e.description}
    <span class="material-symbols-outlined">
        more_vert
    </span>
    </li>`;
    const li = parser.parseFromString(liStr, 'text/html').body.firstChild;
    li.classList.add('task');
    ul.append(li);
  });
};

window.onload = () => {
  showTasks();
};