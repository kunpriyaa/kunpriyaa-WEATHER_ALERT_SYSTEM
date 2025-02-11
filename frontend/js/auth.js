document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        window.location.href = "/pages/weather-data-entry.html";
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});
