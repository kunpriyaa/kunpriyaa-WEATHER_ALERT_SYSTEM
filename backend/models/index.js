require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,       // ASUS
  dbConfig.password,       // 212548
  {
    host: dbConfig.host || process.env.DB_HOST,
    dialect: dbConfig.dialect || 'mysql',
    port: dbConfig.port || process.env.DB_PORT
  }
);

module.exports = sequelize;
