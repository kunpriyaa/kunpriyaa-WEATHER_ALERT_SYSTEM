const express = require('express');
const axios = require('axios');
const sequelize = require('../models/db');
const { DataTypes } = require('sequelize');
const router = express.Router();

const API_KEY = '35fb4229222da5f106b1c228e52d4a7e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherData = sequelize.define(
  'WeatherData',
  {
    location_name: { type: DataTypes.STRING, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    humidity: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'weather_data',
    timestamps: false,
  }
);

router.get('/weather/:location', async (req, res) => {
  const location = req.params.location;

  try {
    const weather = await WeatherData.findOne({
      where: { location_name: location },
    });

    if (weather) {
      return res.json(weather);
    } else {
      const response = await axios.get(BASE_URL, {
        params: {
          q: location,
          appid: API_KEY,
          units: 'metric',
        },
      });

      const { data } = response;

      const newWeather = await WeatherData.create({
        location_name: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });

      return res.json(newWeather);
    }
  } catch (err) {
    console.error('Error fetching weather data:', err.message);
    res.status(500).json({ message: 'Error fetching weather data', error: err.message });
  }
});

module.exports = router;
