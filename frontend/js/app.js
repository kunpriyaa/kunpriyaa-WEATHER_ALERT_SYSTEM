document.getElementById('locationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    
    const response = await fetch(`/api/weather?location=${location}`);
    const data = await response.json();
    
    if (data.message) {
        document.getElementById('weatherResult').innerText = data.message;
    } else {
        document.getElementById('weatherResult').innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
        `;
    }
});
