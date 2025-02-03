window.onload = function() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login.html';
      return;
    }
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
      } else {
        document.getElementById('user-name').textContent = data.email;
        document.getElementById('user-email').textContent = data.email;
        document.getElementById('user-date').textContent = new Date(data.createdAt).toLocaleDateString();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch user profile');
    });
  };
  