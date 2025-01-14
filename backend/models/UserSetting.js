const { DataTypes } = require('sequelize');
const db = require('./db');
const User = require('./User');

const UserSetting = db.define('UserSetting', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alertFrequency: {
    type: DataTypes.ENUM('daily', 'weekly'),
    defaultValue: 'daily',
  },
  emailAlert: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

UserSetting.belongsTo(User); 

module.exports = UserSetting;

