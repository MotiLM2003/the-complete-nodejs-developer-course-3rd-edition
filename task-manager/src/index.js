const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/tasks');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/users', (req, res) => {
  // const user = req.body;
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  console.log(user);
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  console.log(task);
});

app.listen(PORT, () => {
  console.log(`started listining on port ${PORT}`);
});
