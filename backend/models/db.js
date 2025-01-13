const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('weather_alert_system', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false, 
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
