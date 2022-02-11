const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Dynamic',
    name: 'Moti Elmakies',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About page', name: 'Moti Elmakies' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help page', name: 'Moti Elmakies' });
});
app.get('/weather', (req, res) => {
  res.send({ location: 'Bat Yam', forecast: 'Its hot as hell in here' });
});

app.listen(PORT, () => {
  console.log(`Listeining on port ${PORT}`);
});
