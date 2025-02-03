const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Email and Password are required!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      window.location.href = '/profile';
    } else {
      alert(data.message || 'Invalid login credentials');
    }
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});