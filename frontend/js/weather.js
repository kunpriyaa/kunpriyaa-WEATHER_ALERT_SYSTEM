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

    const apiKey = 'd9546f4994e19952b54352199d85c571';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);

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

        if (locationNameElement) locationNameElement.textContent = data.name;
        if (temperatureElement) temperatureElement.textContent = `${data.main.temp}°C`;
        if (humidityElement) humidityElement.textContent = `${data.main.humidity}%`;
        if (windSpeedElement) windSpeedElement.textContent = `${data.wind.speed} m/s`;
        if (descriptionElement) descriptionElement.textContent = data.weather[0].description;
        if (rainStatusElement) {
            const rainStatus = data.rain ? "ฝนตก" : "ไม่มีฝน";  
            rainStatusElement.textContent = rainStatus;
        }
        if (weatherIconElement) {
            weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        }

        const currentTime = new Date().toLocaleTimeString('th-TH');
        if (currentTimeElement) currentTimeElement.textContent = currentTime;

        displayWeatherTrend(data);

        document.getElementById('weather-info').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('เกิดข้อผิดพลาด: ' + error.message);
    }
});

function displayWeatherTrend(data) {
    const ctx = document.getElementById('weather-trend-chart');
    if (!ctx) {
        console.error("Canvas element not found");
        return;
    }
    
    const chartContext = ctx.getContext('2d');
    
    const labels = data.daily ? data.daily.map(day => day.date) : [];
    const temperatures = data.daily ? data.daily.map(day => day.temperature) : [];
    const rainfall = data.daily ? data.daily.map(day => day.rainfall) : [];

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'อุณหภูมิ (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'ปริมาณฝน (mm)',
                data: rainfall,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'วันที่'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'ค่าการวัด'
                    }
                }
            }
        }
    };

    new Chart(chartContext, config);
}
