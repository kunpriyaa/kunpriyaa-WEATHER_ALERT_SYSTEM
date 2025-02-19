const express = require('express');    
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/weather-forecast', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/weather-forecast.html'));
});
app.get('/weather-10days', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/weather-10days.html'));
});
app.get('/weather-data-entry', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/weather-data-entry.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-login.html'));
});
app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/admin-dashboard.html'));
});

app.get('/api/weather', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const apiKey = 'd9546f4994e19952b54352199d85c571c571';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    console.log('Weather Data:', response.data);

    const weatherData = response.data;
    res.json({
      location_name: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      weather_description: weatherData.weather[0].description,
      wind_speed: weatherData.wind.speed,
      icon: weatherData.weather[0].icon,
      rain: weatherData.rain ? weatherData.rain['1h'] : 0 
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
