const setStatus = (array, index) => {
  const element = array[index];
  if (element.completed === true) {
    element.completed = false;
  } else {
    element.completed = true;
  }
  localStorage.setItem('tasks', JSON.stringify(array));
};

const clearCompleted = (array) => {
  const newArray = array.filter((e) => e.completed === false);
  localStorage.setItem('tasks', JSON.stringify(newArray));
};

export { setStatus, clearCompleted };