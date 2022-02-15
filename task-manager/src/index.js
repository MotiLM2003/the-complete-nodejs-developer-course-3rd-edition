const express = require('express');
const app = express();
require('./db/mongoose');
const bcrypt = require('bcrypt');
// importing user routers
const userRouters = require('./routes/usersRoutes');
// tasks routes
const tasksRouters = require('./routes/tasksRoutes');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouters);
app.use(tasksRouters);

app.listen(PORT, () => {
  console.log(`started listining on port ${PORT}`);
});

const Task = require('./models/tasks');
const User = require('./models/user');

// const main = async () => {
// const task = await Task.findById('620b4d2f83d87b19fc2b7c0e').populate(
//   'owner'
// );

//   const user = await User.findById('620b54179bf41a192d841eb4').populate(
//     'tasks'
//   );

//   console.log(user.tasks);
// };

// main();
