const request = require('request');

const geoAccess =
  'pk.eyJ1IjoibW90aWVsbWFraWVzIiwiYSI6ImNrejl0ODRtcDBha2Iyb3MyMndscm82enQifQ.tGXpb-HlH1p1VoLvzQjxLA';

const geoCode = (address, callback) => {
  const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${geoAccess}&limit=1`;

  request({ url: geoURL, json: true }, (err, response) => {
    if (err) {
      callback({ error: 'unable to access to location services.' }, undefined);
      return;
    }
    const { message, features } = response.body;
    if (message) {
      callback({ error: message }, undefined);
    } else if (features.length === 0) {
      callback({ error: 'No locations found.' }, undefined);
    } else {
      const latitude = features[0].center[1];
      const longitude = features[0].center[0];
      callback(undefined, {
        latitude: latitude,
        longitude,
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
