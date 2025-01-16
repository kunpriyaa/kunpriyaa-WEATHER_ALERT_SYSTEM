const express = require('express'); 
const router = express.Router();
const authRoutes = require('./authRoutes');
const userSettingRoutes = require('./userSettingRoutes'); 

router.use('/auth', authRoutes);  
router.use('/user-settings', userSettingRoutes);  

module.exports = router;

