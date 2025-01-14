const { DataTypes } = require('sequelize');
const db = require('./db');
const User = require('./User');

const FavoriteLocation = db.define('FavoriteLocation', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = FavoriteLocation;
