const express = require('express');
const { User, Location } = require('../models');
const router = express.Router();
router.post('/add', async (req, res) => {
  const { userId, locationId } = req.body;
  
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addLocation(locationId);

    res.status(200).json({ message: 'Location added to favorites' });
  } catch (error) {
    console.error('Error adding favorite location:', error);
    res.status(500).json({ message: 'Error adding favorite location' });
  }
});

module.exports = router;
