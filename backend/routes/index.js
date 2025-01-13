const express = require('express');
const authRoutes = require('./authRoutes');
const weatherRoutes = require('./weatherRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;
