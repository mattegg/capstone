var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
var apikey = process.env.API_KEY;

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
  console.log('Sentiment Checker App listening on port 8080!');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
app.post('/userUrl', async (req, res) => {
  console.log('req.body ===+>', req.body);
  const response = await fetch(
    baseURL + apikey + '&lang=en&url=' + req.body.formUrl,
    { method: 'POST' }
  );
  try {
    const data = await response.json();

    res.send(data);
  } catch (error) {
    console.log('error', error);
  }
});
