document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        document.getElementById('message').textContent = 'Login successful!';
        window.location.href = 'settings.html'; 
      } else {
        document.getElementById('message').textContent = result.message;
      }
    } catch (error) {
      console.error(error);
      document.getElementById('message').textContent = 'Error during login.';
    }
  });
  
  