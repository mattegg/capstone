var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
var apikey = process.env.API_KEY;
module.exports = { app };

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fetch = require('node-fetch');

app.use(express.static('dist'));
app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(8080, function () {
  console.log('Travel Planner  App listening on port 8080!');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

app.post('/processLocation', async (req, res) => {
  const geonamesKey = process.env.GEONAMES_KEY;
  const weatherbitKey = process.env.WEATHERBIT_KEY;
  const pixabayKey = process.env.PIXABAY_KEY;
  const location = req.body.location;
  // console.log(location);
  const geoUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesKey}`;
  console.log(geoUrl);
  let data = {};
  await fetch(geoUrl)
    .then((response) => response.json())
    .then((response) => {
      const { lat, lng, toponymName, countryName } = response.geonames[0];
      data = {
        toponymName,
        countryName,
        lat,
        lng,
      };
    })
    .catch((error) => console.log('error', error));


  const currentWeather = `https://api.weatherbit.io/v2.0/current?lat=${data.lat}&lon=${data.lng}&key=${weatherbitKey}`;
  await fetch(currentWeather)
    .then((response) => response.json())
    .then((response) => {
      data = {
        ...data,
        curentWeather: response.data[0],
      };
    })
    .catch((error) => console.log('error', error));

    
  const forecastWeather = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.lat}&lon=${data.lng}&key=${weatherbitKey}`;
  await fetch(forecastWeather)
    .then((response) => response.json())
    .then((response) => {
      data = {
        ...data,
        forecastWeather: response.data,
      };
    })
    .catch((error) => console.log('error', error));

   
   
    //image
    let pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${data.toponymName}&orientation=horizontal&image_type=photo`;
    console.log(pixabayUrl);
    let imageURL = '';

    await fetch(pixabayUrl)
      .then((response) => response.json())
      .then((response) => {
        imageURL = response.hits[0].webformatURL;
      })
      .catch((error) => console.log('error', error));


    data = {
      ...data,
      imageURL,
    };

  console.log(data);
  res.send(data);
});
