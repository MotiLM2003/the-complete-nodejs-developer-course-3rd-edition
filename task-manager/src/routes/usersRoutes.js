const express = require('express');
const router = new express.Router();
const User = require('../models/user');
router.post('/users', async (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all users
router.get('/users/', async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user by id
router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
    res;
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/users/:id', async (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, filter, {
      new: true,
      runValidation: true,
    });
    if (!user) {
      return res.status(404).send({});
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await User.findByIdAndDelete(id);
    res.send(deleted);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
