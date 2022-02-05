const request = require('request');

const token = '2fa976f7cbd583126c5f1c4dafb17713';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${token}&query=${latitude},${longitude}`;
  request({ url, json: true }, (err, response) => {
    if (err) {
      callback({ error: 'unable to connect to weeather service!' }, undefined);
    } else if (response.body.error) {
      callback({ error: 'unable to find locatio' }, undefined);
    } else {
      const data = response.body;
      const feelslike = data.current.feelslike;
      const temp = data.current.temperature;
      callback(undefined, {
        forecast: `${data.current.weather_descriptions[0]}. it's currently : ${temp} degress out. it feels like ${feelslike} degress out.`,
      });
    }
  });
};

module.exports = forecast;
