const express = require('express');
const bcrypt = require('bcrypt');
const WeatherData = require('../models/weather_data');
const User = require('../models/User');
const router = express.Router();

router.get('/weather/:location', async (req, res) => {
  const location = req.params.location;

  try {
    const weather = await WeatherData.findOne({
      where: { location_name: location },
    });
    if (weather) {
      res.json(weather);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

module.exports = router;

