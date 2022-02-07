const https = require('http');

const token = '2fa976f7cbd583126c5f1c4dafb17713';

const url = `http://api.weatherstack.com/current?access_key=${token}&query=${37.806},${-122.411}`;
const request = https.request(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data = data + chunk.toString();
    console.log(data);
  });

  response.on('end', () => {
    console.log('end', data);
  });
});

request.end();
