require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME || 'weather_alert_system',
  process.env.DB_USER || 'ASUS',
  process.env.DB_PASS || '212548',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;
