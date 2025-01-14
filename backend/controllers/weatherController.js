const fetch = require('node-fetch');

exports.getWeather = async (req, res) => {
  const { location } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

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
};
