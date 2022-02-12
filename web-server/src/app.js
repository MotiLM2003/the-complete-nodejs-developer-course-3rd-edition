const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast');

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
  const { address = null } = req.query;
  if (!address) {
    return res.send({ message: 'You must provide an address.' });
  }
  // res.send({
  //   location: 'Bat Yam',
  //   forecast: 'Its hot as hell in here',
  //   address,
  // });

  geoCode(address, (err, geoData) => {
    if (err) {
      return res.send({ error: err });
    } else {
      console.log(`forecast for ${geoData.location}`);
      forecast(geoData.latitude, geoData.longitude, (error, data) => {
        if (err) {
          return res.send({ error: err });
        } else {
          res.send({ forecast: data, address, location: geoData.location });
        }
      });

      // console.log(data);
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Moti Elmakies',
  });
});

app.get('/products', (req, res) => {
  const { search = null } = req.query;
  if (!search) {
    return res.send({ message: 'you must provide a search term' });
  }
  console.log(req.query);
  res.send({ products: [] });
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
