require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('6208b65d1eea5dea09ff162f', { age: 23 })
  .then((user) => {
    // console.log(user);
    return User.countDocuments({ age: 23 });
  })
  .then((count) => {
    console.log(count);
  });

//6208b65d1eea5dea09ff162f
