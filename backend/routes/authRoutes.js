const { DataTypes } = require('sequelize');
const db = require('../models/db');
const User = require('../models/User');

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





