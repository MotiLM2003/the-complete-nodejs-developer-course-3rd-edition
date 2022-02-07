const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('main page');
});

app.get('/help', (req, res) => {
  res.send('help page');
});
app.get('/about', (req, res) => {
  res.send('about page');
});
app.get('/weather', (req, res) => {
  res.send('weather page');
});

app.listen(PORT, () => {
  console.log(`Listeining on port ${PORT}`);
});
