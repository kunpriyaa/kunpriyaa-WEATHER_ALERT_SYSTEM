const express = require('express');
const authRoutes = require('./authRoutes');
const weatherRoutes = require('./weatherRoutes');
const userSettingRoutes = require('./userSettingRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/weather', weatherRoutes);
router.use('/settings', userSettingRoutes);

module.exports = router;
