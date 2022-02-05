const request = require('request');

const axios = require('axios');
const { config } = require('process');

// const data = require('./test.json');

const geoAccess =
  'pk.eyJ1IjoibW90aWVsbWFraWVzIiwiYSI6ImNrejl0ODRtcDBha2Iyb3MyMndscm82enQifQ.tGXpb-HlH1p1VoLvzQjxLA';
const url =
  'http://api.weatherstack.com/current?access_key=2fa976f7cbd583126c5f1c4dafb17713&query=37.8267,-122.4233';

const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${geoAccess}&limit=1`;
// const url = 'test.json';

// request({ url, json: true }, (err, response) => {
//   if (err) {
//     console.log('unable to connect to weeather service!');
//   } else if (response.body.error) {
//     console.log('unable to find location');
//   } else {
//     const data = response.body;
//     const feelslike = data.current.feelslike;
//     const temp = data.current.temperature;
//     console.log(
//       `${data.current.weather_descriptions[0]}. it's currently : ${temp} degress out. it feels like ${feelslike} degress out.`
//     );
//   }
// });

// request({ url: geoURL, json: true }, (err, response) => {
//   const { message, features } = response.body;
//   if (err) {
//     console.log('unable to access to location services.');
//   } else if (message) {
//     console.log(`Error: ${message}`);
//   } else if (features.length === 0) {
//     console.log('No locations found.');
//   } else {
//     const latitude = features[0].center[1];
//     const longitude = features[0].center[0];
//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//   }
// });

const geoCode = (address, callback) => {
  const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${geoAccess}&limit=1`;

  request({ url: geoURL, json: true }, (err, response) => {
    const { message, features } = response.body;
    if (err) {
      callback({ error: 'unable to access to location services.' });
    } else if (message) {
      callback({ error: message });
    } else if (features.length === 0) {
      callback({ error: 'No locations found.' });
    }
  });
};

geoCode('Tel Aviv', (err, data) => {});
