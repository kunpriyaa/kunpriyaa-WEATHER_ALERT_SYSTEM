const express = require('express');
const { createUserSetting } = require('../controllers/userSettingController');
const router = express.Router();

router.post('/', createUserSetting);

module.exports = router;

