const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const db = require('./models/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', weatherRoutes);

db.authenticate()
  .then(() => console.log('Success'))
  .catch((err) => console.error('No success:', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});












