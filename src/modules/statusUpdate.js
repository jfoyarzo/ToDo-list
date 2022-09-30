const setStatus = (array, index) => {
  const element = array[index];
  if (element.completed === true) {
    element.completed = false;
  } else {
    element.completed = true;
  }
  localStorage.setItem('tasks', JSON.stringify(array));
};

export { setStatus };