async function fetchWeather(location) {
    const response = await fetch(`http://localhost:3000/api/weather?location=${location}`);
    const data = await response.json();
    console.log(data);
    // Handle data display here
  }
  