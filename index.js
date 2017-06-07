const express = require('express');
const _ = require('lodash');
const app = express()

const projects = [];

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/projects', function (req, res) {
  res.json(projects);
});

app.get('/projects/:project', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  res.json(projects);
});

app.post('/projects/:project', function (req, res) {
  projects.push(new Project(req.params.project));
  res.json(projects);
});

app.get('/projects/:project/tasks', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  res.json(project.tasks);
});

app.post('/projects/:project/tasks/:task', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  project.addTask(new Task(req.params.task));
  res.json(project.tasks);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
