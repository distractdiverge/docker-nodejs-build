const express = require('express');
const Project = require('./models/project');
const Task = require('./models/task');
const _ = require('lodash');
const hal = require('express-hal');

const app = express();

app.use(hal.middleware);

const projects = [];

app.get('/', function (req, res) {
  res.hal({
    links: {
      self: '/',
      projects: '/projects'
    }
  });
});

app.get('/projects', function (req, res) {
  res.hal({
    data: projects,
    links: {
      self: '/projects',
      find: {href:'/projects{?name}', templated: true}
    }
  });
});

app.get('/projects/:project', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  res.hal({
    data: project,
    links: {
      self: `/projects/${req.params.project}`,
      tasks: `/projects/${req.params.project}/tasks`
    }
  });
});

app.post('/projects/:project', function (req, res) {
  projects.push(new Project(req.params.project));
  res.hal({
    data: projects,
    links: {
      self: '/projects',
      find: {href:'/projects{?name}', templated: true}
    }
  });
});

app.get('/projects/:project/tasks', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  res.hal({
    data: project.tasks,
    links: {
      self: `/projects/${req.param.project}/tasks`
    }
  })
});

app.post('/projects/:project/tasks/:task', function (req, res) {
  const project = _.find(projects, {'name': req.params.project});
  project.addTask(new Task(req.params.task));
  res.hal({
    data: project.tasks,
    links: {
      self: `/projects/${req.params.project}/tasks/${req.params.task}`
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
