const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/tasks');

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all tasks
router.get('/tasks', auth, async (req, res) => {
  const owner = req.user._id;
  try {
    const tasks = await Task.find({ owner });
    res.send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get task by id
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;
  try {
    const task = await Task.findOne({ _id, owner });
    res.send(task);
  } catch (error) {
    res.status(400).send('no tasks match this id');
  }
});

// update task.
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedFields = ['description', 'completed'];
  const id = req.params.id;
  const filter = req.body;
  const owner = req.user._id;

  try {
    //  *** COMMENTED BECAUSE WE NEED TO USE  "SAVE" FOR THE PRE MIDDLEWARE TO RUN ***
    // const task = await Task.findByIdAndUpdate(id, filter, {
    //   new: true,
    //   runValidation: true,
    // });

    // const task = await Task.findById(id);
    const task = await findOne({ id, owner });
    if (!task) {
      return res.status(404).send();
    }
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
