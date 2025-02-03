const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const WeatherData = sequelize.define('WeatherData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wind_speed: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0,
  },
  weather_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = WeatherData;
