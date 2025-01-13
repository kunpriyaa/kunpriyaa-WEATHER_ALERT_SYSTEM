const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await User.create({ email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during signup', error);
        res.status(500).json({ message: 'Error during signup' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await user.validPassword(password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

module.exports = router;
