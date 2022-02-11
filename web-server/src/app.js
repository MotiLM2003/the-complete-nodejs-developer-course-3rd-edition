const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Define paths for express config.
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));
const PORT = process.env.PORT || 5000;

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

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Moti Elmakies',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Moti Elmakies',
  });
});

app.listen(PORT, () => {
  console.log(`Listeining on port ${PORT}`);
});
