const express = require('express');
const router = express.Router();

const Task = require('../models/tasks');

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    console.log(task);
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get task by id
router.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    res.send(task);
  } catch (error) {
    res.status(400).send('no tasks match this id');
  }
});

// update task.
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedFields = ['description', 'completed'];
  const id = req.params.id;
  const filter = req.body;
  try {
    // const task = await Task.findByIdAndUpdate(id, filter, {
    //   new: true,
    //   runValidation: true,
    // });

    const task = await Task.findById(id);
    updates.forEach((update) => task[(update = req.body[update])]);
    task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.findByIdAndDelete(id);
    res.send(deleted);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
