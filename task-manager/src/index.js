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

// get all users
app.get('/users/', (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// get user by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send('no user match the ID');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
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

// get all tasks
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  Task.findById(id).then((task) => {
    if (!task) {
      return res.status(400).send('no tasks match this id');
    }

    res.send(task);
  });
});

app.listen(PORT, () => {
  console.log(`started listining on port ${PORT}`);
});
