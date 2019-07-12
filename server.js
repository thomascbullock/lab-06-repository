const express = require('express');
const cors = require('cors');
require('dotenv');

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(cors());

function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = query;
  return location;
}

app.get('/location', (req, res) => {
  // get location data from geo.json
  console.log('made a request to get route');
  const locationData = searchToLatLong(req.query.data);
  console.log(locationData);
  res.send(locationData);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


