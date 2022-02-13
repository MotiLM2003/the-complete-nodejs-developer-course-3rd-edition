require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('6208b65d1eea5dea09ff162f', { age: 23 })
//   .then((user) => {
//     // console.log(user);
//     return User.countDocuments({ age: 23 });
//   })
//   .then((count) => {
//     console.log(count);
//   });

const updateAgeAndGetCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

const count = updateAgeAndGetCount('6208bd687512ac0ff73fb8ea', 70);
console.log(count);

//6208b65d1eea5dea09ff162f
