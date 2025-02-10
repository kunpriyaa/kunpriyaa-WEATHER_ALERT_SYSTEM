document.addEventListener("DOMContentLoaded", function () {
    const weatherLink = document.getElementById('weather-forecast-link');
    const homeLink = document.getElementById('home-link');
    const weatherMonthlyLink = document.getElementById('weather-monthly-link');
    const weather10DaysLink = document.getElementById('weather-10days-link');
    
    weatherLink.classList.add('active');
    homeLink.classList.remove('active');
    weatherMonthlyLink.classList.remove('active');
    weather10DaysLink.classList.remove('active');

    const statusMessage = document.getElementById('status-message');
    if (statusMessage) {
        statusMessage.style.display = 'block'; 
    }
});

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

        const locationNameElement = document.getElementById('location-name');
        const temperatureElement = document.getElementById('temperature');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('wind-speed');
        const descriptionElement = document.getElementById('description');
        const rainStatusElement = document.getElementById('rain-status');
        const weatherIconElement = document.getElementById('weather-icon');
        const currentTimeElement = document.getElementById('current-time');

        if (locationNameElement) locationNameElement.textContent = data.location_name;
        if (temperatureElement) temperatureElement.textContent = `${data.temperature}°C`;
        if (humidityElement) humidityElement.textContent = data.humidity;
        if (windSpeedElement) windSpeedElement.textContent = data.wind_speed;
        if (descriptionElement) descriptionElement.textContent = data.weather_description;
        if (rainStatusElement) {
            const rainStatus = data.rain ? "ฝนตก" : "ไม่มีฝน";  
            rainStatusElement.textContent = rainStatus;
        }
        if (weatherIconElement) {
            weatherIconElement.src = `http://openweathermap.org/img/wn/${data.icon}.png`;
        }

        const currentTime = new Date().toLocaleTimeString('th-TH');
        if (currentTimeElement) currentTimeElement.textContent = currentTime;

        document.getElementById('weather-info').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
});
