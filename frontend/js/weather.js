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
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric&lang=th`;

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

        if (locationNameElement) locationNameElement.textContent = data.city.name;
        if (temperatureElement) temperatureElement.textContent = `${data.list[0].main.temp}°C`;
        if (humidityElement) humidityElement.textContent = `${data.list[0].main.humidity}%`;
        if (windSpeedElement) windSpeedElement.textContent = `${data.list[0].wind.speed} m/s`;
        if (descriptionElement) descriptionElement.textContent = data.list[0].weather[0].description;
        if (rainStatusElement) {
            const rainStatus = data.list[0].rain ? "ฝนตก" : "ไม่มีฝน";  
            rainStatusElement.textContent = rainStatus;
        }
        if (weatherIconElement) {
            weatherIconElement.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
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

    const labels = data.list.slice(0, 7).map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleString('th-TH', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    });

    const temperatures = data.list.slice(0, 7).map(item => item.main.temp);
    const rainfall = data.list.slice(0, 7).map(item => item.rain ? item.rain['3h'] : 0);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'อุณหภูมิ (°C)',
                data: temperatures,
                borderColor: 'rgb(47, 109, 190)',
                backgroundColor: 'rgba(32, 139, 189, 0.3)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(6, 38, 75)',
                borderWidth: 2,
                hoverBorderColor: 'rgba(0, 0, 0, 1)',
                pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
            },
            {
                label: 'ปริมาณฝน (mm)',
                data: rainfall,
                borderColor: 'rgb(253, 88, 101)',
                backgroundColor: 'rgba(243, 7, 66, 0.3)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                hoverBorderColor: 'rgba(0, 0, 0, 1)',
                pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
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
                    labels: {
                        font: {
                            size: 14,
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            if (tooltipItem.datasetIndex === 0) {
                                return `อุณหภูมิ: ${tooltipItem.raw}°C`;
                            } else {
                                return `ปริมาณฝน: ${tooltipItem.raw} mm`;
                            }
                        }
                    }
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'วันและเวลา',
                        font: {
                            size: 14,
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'ค่าการวัด',
                        font: {
                            size: 14,
                        }
                    },
                    beginAtZero: false,
                    ticks: {
                        stepSize: 1,
                    }
                }
            }
        }
    };

    new Chart(chartContext, config);
}
