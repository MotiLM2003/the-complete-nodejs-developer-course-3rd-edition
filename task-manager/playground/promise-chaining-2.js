require('../src/db/mongoose');
const Tasks = require('../src/models/tasks');

// Tasks.findByIdAndDelete('6208c7ebcc868953b785b1c4')
//   .then(() => {
//     return Tasks.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log(count);
//   });

const deleteTaskByIdAndGetCount = async (id) => {
  await Tasks.findByIdAndDelete(id);
  const count = await Tasks.countDocuments({ completed: false });
  console.log('new count', count);
  return count;
};

deleteTaskByIdAndGetCount('6208c7ffcc868953b785b1ca').then((count) =>
  console.log(count)
);

// 6208c7ffcc868953b785b1ca
