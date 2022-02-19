//  app initialzing
const express = require('express');
const app = express();
require('./db/mongoose');

// importing user routers
const userRouters = require('./routes/usersRoutes');
// tasks routes
const tasksRouters = require('./routes/tasksRoutes');

app.use(express.json());
app.use(userRouters);
app.use(tasksRouters);

module.exports = app;
