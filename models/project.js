module.exports = function Project(name) {
  this.name = name;
  this.tasks = [];

  this.addTask(task) {
    this.tasks.push(task);
  };

};
