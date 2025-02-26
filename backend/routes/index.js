const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/signup.html'));
});
router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});
router.get('/admin-login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/admin-login.html'));
});

router.post("/api/admin/login", authController.adminLogin);

module.exports = router;
