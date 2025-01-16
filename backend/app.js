const express = require('express');
const sequelize = require('./models/db');

const app = express();

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Failed to connect to the database', err));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});