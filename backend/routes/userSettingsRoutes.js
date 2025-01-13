const express = require('express');
const UserSetting = require('../models/UserSetting');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/settings', authenticate, async (req, res) => {
  const { alertTemperature, alertRain } = req.body;

  try {
    const userSetting = await UserSetting.create({
      userId: req.userId,
      alertTemperature,
      alertRain,
    });
    res.status(201).json({ message: 'User settings saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user settings' });
  }
});

router.get('/settings', authenticate, async (req, res) => {
  try {
    const userSetting = await UserSetting.findOne({ where: { userId: req.userId } });

    if (!userSetting) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.json(userSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user settings' });
  }
});

module.exports = router;
