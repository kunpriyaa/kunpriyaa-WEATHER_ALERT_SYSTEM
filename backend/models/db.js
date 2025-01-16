const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('เชื่อมต่อฐานข้อมูลสำเร็จ'))
  .catch((err) => console.error('ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err));

module.exports = sequelize;

