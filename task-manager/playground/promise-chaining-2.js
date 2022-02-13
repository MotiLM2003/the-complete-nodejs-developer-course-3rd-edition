require('../src/db/mongoose');
const Tasks = require('../src/models/tasks');

Tasks.findByIdAndDelete('6208c7ebcc868953b785b1c4')
  .then(() => {
    return Tasks.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log(count);
  });

// 6208c807cc868953b785b1ce
