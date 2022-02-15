const mongoose = require('mongoose');
// const validator = require('validator');

const tasksSchema = mongoose.Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
});

tasksSchema.pre('save', async function (next) {
  const task = this;
  console.log('before task save');
  next();
});

const Tasks = mongoose.model('tasks', tasksSchema);
module.exports = Tasks;
