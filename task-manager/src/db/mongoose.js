const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

// const User = mongoose.model('User', {
//   name: { type: String },
//   age: { type: Number },
// });

const Tasks = mongoose.model('tasks', {
  description: { type: String },
  completed: { type: Boolean },
});

const task = new Tasks({ description: 'taks 1', completed: false });

task
  .save()
  .then(() => {
    console.log('taks completed');
  })
  .catch((err) => {
    console.log(err);
  });

// const user = new User({ name: 'Moti Elmakies', age: 'moti' });

// user
//   .save()
//   .then((result) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log('error', err);
//   });
