const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Favorite = sequelize.define('Favorite', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Favorite;