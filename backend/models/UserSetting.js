const Sequelize = require('sequelize');
const db = require('./index');

const UserSetting = db.define('user_setting', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  alertTemperature: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  alertRain: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = UserSetting;
