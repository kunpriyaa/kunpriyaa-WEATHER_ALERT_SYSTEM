const { UserSetting } = require('../models');

exports.createUserSetting = async (req, res) => {
  const { userId, location, alertFrequency, emailAlert } = req.body;
  try {
    const userSetting = await UserSetting.create({ userId, location, alertFrequency, emailAlert });
    res.status(201).json(userSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
