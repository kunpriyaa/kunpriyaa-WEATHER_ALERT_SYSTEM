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
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/profile.html'));
});
app.get('/setting', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/setting.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/signup.html'));
});
app.get('/weather-monthly', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/weather-monthly.html'));
});
app.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/weather.html'));
});

app.get('/api/weather', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }
  
  try {
    const apiKey = 'd9546f4994e19952b54352199d85c571';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    console.log(`Fetching weather data for: ${location}`);
    
    const response = await axios.get(url);
    console.log('Weather Data:', response.data);

    const weatherData = response.data;
    res.json({
      location_name: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      weather_description: weatherData.weather[0].description,
      wind_speed: weatherData.wind.speed,
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
