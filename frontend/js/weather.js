document.getElementById('search-btn').addEventListener('click', async () => {
  const location = document.getElementById('search-location').value;
  if (!location) {
      alert('กรุณาป้อนตำแหน่งที่ตั้ง');
      return;
  }

  try {
      const response = await fetch(`/api/weather?location=${location}`);
      if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ');
      }

      const data = await response.json();
      document.getElementById('weather-info').style.display = 'block';
      document.getElementById('location-name').textContent = data.location_name;
      document.getElementById('temperature').textContent = data.temperature;
      document.getElementById('humidity').textContent = data.humidity;
      document.getElementById('description').textContent = data.weather_description;
      document.getElementById('wind-speed').textContent = data.wind_speed;
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  } catch (error) {
      alert('Error: ' + error.message);
  }
});