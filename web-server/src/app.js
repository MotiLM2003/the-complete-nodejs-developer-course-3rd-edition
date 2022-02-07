const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();
console.log('-', publicPath, '-');

app.use(express.static(publicPath));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>main page</h1>');
});
app.get('/weather', (req, res) => {
  res.send('weather page');
});

app.listen(PORT, () => {
  console.log(`Listeining on port ${PORT}`);
});
