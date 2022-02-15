const express = require('express');
const app = express();
require('./db/mongoose');
const multer = require('multer');
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
