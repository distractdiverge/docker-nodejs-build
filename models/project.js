module.exports = function Project(name) {
  this.name = name;
  this.tasks = [];

  this.addTask = function addTask(task) {
    this.tasks.push(task);
  };

};
