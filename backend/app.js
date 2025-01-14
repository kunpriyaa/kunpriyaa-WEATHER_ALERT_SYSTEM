const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const db = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/api/weather', async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = 'Bangkok';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      res.json(data); 
    } else {
      res.status(404).json({ message: 'Weather data not found' });
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Weather Alert System!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});











