const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// creating new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login user

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    res.send(user);
  } catch (error) {
    res.status(400).send('could not authenticate user');
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
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];

  // is valid will only be true if allowed field is updating.
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send('Error: invalid fields were in updates');
  }

  const id = req.params.id;
  const filter = req.body;

  try {
    const user = await User.findById(id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

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
