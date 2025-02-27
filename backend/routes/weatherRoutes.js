const express = require("express");
const axios = require("axios");
const sequelize = require("../models/db");
const { DataTypes } = require("sequelize");
const weatherController = require("../controllers/weatherController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherData = sequelize.define(
  "WeatherData",
  {
    location_name: { type: DataTypes.STRING, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    humidity: { type: DataTypes.FLOAT, allowNull: false },
    wind_speed: { type: DataTypes.FLOAT, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    date_time: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "weather_data",
    timestamps: false,
  }
);

router.get("/weather/:location", async (req, res) => {
  const location = req.params.location;

  try {
    const weather = await WeatherData.findOne({
      where: { location_name: location },
    });

    if (weather) {
      return res.json(weather);
    } else {
      const response = await axios.get(BASE_URL, {
        params: { q: location, appid: API_KEY, units: "metric" },
      });

      const { data } = response;

      const newWeather = await WeatherData.create({
        location_name: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed || null,
        description: data.weather[0].description,
        date_time: new Date(),
      });

      return res.json(newWeather);
    }
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
    res.status(500).json({ message: "Error fetching weather data", error: err.message });
  }
});

router.post("/api/weather", authMiddleware.verifyAdmin, async (req, res) => {
  const { location, temperature, humidity, wind_speed, weather_description, date_time } = req.body;

  if (!location || !temperature || !humidity || !date_time) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
  }

  try {
    const newWeather = await WeatherData.create({
      location_name: location,
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity),
      wind_speed: wind_speed ? parseFloat(wind_speed) : null,
      description: weather_description || "ไม่ระบุ",
      date_time: new Date(date_time),
    });

    res.status(201).json({ message: "บันทึกข้อมูลสภาพอากาศสำเร็จ", data: newWeather });
  } catch (err) {
    console.error("Error saving weather data:", err.message);
    res.status(500).json({ message: "Error saving weather data", error: err.message });
  }
});

module.exports = router;
