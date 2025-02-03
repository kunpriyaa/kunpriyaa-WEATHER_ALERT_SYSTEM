const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/signup.html'));
});
router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

module.exports = router;
