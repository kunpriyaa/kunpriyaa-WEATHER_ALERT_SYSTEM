const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_KEY = 'your_openweather_api_key';
router.get('/weather-report', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}`);
    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: 'Error fetching weather data' });
    }
  } catch (error) {
    console.error('Error fetching weather report:', error);
    res.status(500).json({ message: 'Error fetching weather report' });
  }
});

module.exports = router;
