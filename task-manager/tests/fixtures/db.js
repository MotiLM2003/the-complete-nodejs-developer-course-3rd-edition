const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/tasks');
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'test user 1',
  email: 'test1@gmail.com',
  password: 'test1234!!567',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'test user 2',
  email: 'test2@gmail.com',
  password: 'test1234!!567',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOneId = mongoose.Types.ObjectId();
const taskTwoId = mongoose.Types.ObjectId();
const taskThreeId = mongoose.Types.ObjectId();
const taskOne = {
  _id: taskOneId,
  description: 'pre created task 1',
  owner: userOne._id,
};

const taskTwo = {
  _id: taskTwoId,
  description: 'pre created task 2',
  owner: userOne._id,
};

const taskThree = {
  _id: taskThreeId,
  description: 'pre created task 3',
  completed: true,
  owner: userTwo._id,
};

const setDatabase = async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  // creating test task 1
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  setDatabase,
  taskOne,
  taskTwo,
  taskThree,
};
