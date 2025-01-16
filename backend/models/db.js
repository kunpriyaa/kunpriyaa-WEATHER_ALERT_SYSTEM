const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
console.log('Database Configuration:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '********' : 'NOT SET');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

console.log('Database Configuration:');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '********' : 'NOT SET');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT || 3306, 
    dialect: 'mariadb',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connection successful! 🎉'))
  .catch((err) => {
    console.error('Database connection failed! ❌');
    console.error('Error details:', err.message);
    process.exit(1);
  });

module.exports = sequelize;


