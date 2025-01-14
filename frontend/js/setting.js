document.getElementById('settingsForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const location = document.getElementById('location').value;
    const alertFrequency = document.getElementById('alertFrequency').value;
    const emailAlert = document.getElementById('emailAlert').checked;
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        document.getElementById('message').textContent = 'You must be logged in to update settings.';
        return;
      }
  
      const response = await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ location, alertFrequency, emailAlert }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('message').textContent = 'Settings updated successfully!';
      } else {
        document.getElementById('message').textContent = result.message || 'Failed to update settings.';
      }
    } catch (error) {
      console.error(error);
      document.getElementById('message').textContent = 'An error occurred while updating settings.';
    }
  });
  
  async function loadSettings() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        document.getElementById('message').textContent = 'You must be logged in to view settings.';
        return;
      }

      const response = await fetch('http://localhost:3000/api/settings', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('location').value = result.location || '';
        document.getElementById('alertFrequency').value = result.alertFrequency || 'daily';
        document.getElementById('emailAlert').checked = result.emailAlert || false;
      } else {
        document.getElementById('message').textContent = result.message || 'Failed to load settings.';
      }
    } catch (error) {
      console.error(error);
      document.getElementById('message').textContent = 'An error occurred while loading settings.';
    }
  }
  
  loadSettings();
  