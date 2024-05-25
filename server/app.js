const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = { id: idCounter++, title, description, status, dueDate };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks[taskIndex] = { id: parseInt(req.params.id), title, description, status, dueDate };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
