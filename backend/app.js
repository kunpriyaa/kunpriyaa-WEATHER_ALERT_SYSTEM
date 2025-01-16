const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.use('/css', express.static(path.join(__dirname, '..', 'frontend', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'frontend', 'js')));
app.use('/pages', express.static(path.join(__dirname, '..', 'frontend', 'pages')));

async function getWeatherByLocation(location) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    const data = response.data;
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      city: data.name
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});

app.get('/weather', async (req, res) => {
  const location = req.query.location || 'Bangkok';
  const weatherData = await getWeatherByLocation(location);

  if (weatherData) {
    res.json(weatherData);
  } else {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});