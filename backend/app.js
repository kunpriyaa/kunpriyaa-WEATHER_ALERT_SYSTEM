const express = require('express');
const sequelize = require('./models');
const app = express();

app.get('/', (req, res) => {
  res.send('Server running at http://localhost:3000');
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection failed!', error);
  });

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
