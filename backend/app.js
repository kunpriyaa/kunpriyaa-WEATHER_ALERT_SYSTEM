const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const db = require('./models/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});












