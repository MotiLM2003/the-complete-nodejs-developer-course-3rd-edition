const request = require('request');
const geoCode = require('./utils/geocode');
// const chalk = require('chalk');
const forecast = require('./utils/forecast');
const { config } = require('process');
const location = process.argv[2];
console.log(location[2]);

geoCode(location, (err, geoData) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`forecast for ${geoData.location}`);
    forecast(geoData.latitude, geoData.longitude, (error, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data', data);
      }
    });
    // console.log(data);
  }
});
