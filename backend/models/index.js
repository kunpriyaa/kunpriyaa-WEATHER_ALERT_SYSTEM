const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('weather_alert_system', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false, 
});

module.exports = sequelize;

module.exports = connection;
