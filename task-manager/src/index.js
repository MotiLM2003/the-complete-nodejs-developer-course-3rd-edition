const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`started listining on port ${PORT}`);
});
