const axios = require('axios');

const getWeatherData = async (req, res) => {
    try {
        const { location } = req.query;
        const apiKey = process.env.API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

module.exports = { getWeatherData };
