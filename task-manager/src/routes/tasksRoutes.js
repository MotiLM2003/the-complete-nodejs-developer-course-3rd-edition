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
  const { completed, skip, limit, sortBy } = req.query;
  const filters = {};
  const options = {};
  const sort = {};
  if (completed) {
    filters.completed = completed;
  }
  if (limit) {
    options.limit = limit;
  }
  if (skip) {
    options.skip = skip;
  }

  if (sortBy) {
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? 1 : -1;
  }
  sort.createdAt = 1;
  options.sort = sort;

  const owner = req.user._id;

  try {
    // const tasks = await Task.find({ owner });
    await req.user.populate({
      path: 'tasks',
      match: filters,
      options,
    });
    res.send(req.user.tasks);
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

    //
    // const task = await Task.findById(id);
    const task = await Task.findOne({ id, owner });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      return (task[update] = req.body[update]);
    });
    task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  try {
    // const deleted = await Task.findByIdAndDelete(id);
    const deleted = await Task.findOneAndDelete({ id, owner });
    res.send(deleted);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
