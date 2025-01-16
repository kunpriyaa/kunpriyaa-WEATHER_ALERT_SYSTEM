const fetch = require('node-fetch');

exports.getWeatherData = async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = req.query.city || 'Bangkok';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      res.json(data); 
    } else {
      res.status(404).json({ message: 'ไม่พบข้อมูลสภาพอากาศ' });
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ:', error);
    res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลสภาพอากาศได้' });
  }
};

