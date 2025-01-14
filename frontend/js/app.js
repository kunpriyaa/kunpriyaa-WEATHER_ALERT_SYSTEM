async function getWeatherData() {
  const url = 'http://localhost:3000/api/weather';  

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeatherData(data);
    } else {
      alert('Weather data not found!');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeatherData(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

window.onload = () => {
  getWeatherData();
};





