const tasks = {
  tasks: [
    {
      text: 'Gerocery Shopping',
      completed: true,
    },
    {
      text: 'Clean yard',
      completed: false,
    },
    {
      text: 'Film course',
      completed: false,
    },
  ],
  getTasksToDo() {
    return this.tasks.filter((task) => !task.completed);
  },
};

console.log(tasks.getTasksToDo());
