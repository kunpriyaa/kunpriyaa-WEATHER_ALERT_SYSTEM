const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weatherRoutes');


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});














