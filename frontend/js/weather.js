export async function fetchWeatherData() {
  const response = await fetch('http://localhost:3000/api/weather');
  const data = await response.json();

  if (data) {
    document.getElementById('temperature').innerText = `อุณหภูมิ: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `ความชื้น: ${data.main.humidity} %`;
    document.getElementById('rain').innerText = `ปริมาณฝน: ${data.rain ? data.rain['1h'] : 'ไม่มีข้อมูล'} mm`;
  } else {
    console.error('ไม่สามารถดึงข้อมูลสภาพอากาศ');
  }
}

  