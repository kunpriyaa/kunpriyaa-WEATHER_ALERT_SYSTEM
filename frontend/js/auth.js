document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.status === 200) {
    alert('Login successful!');
    localStorage.setItem('token', result.token);
    window.location.href = '/weather.html';
  } else {
    alert('Login failed: ' + result.message);
  }
});

document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  
  const response = await fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });

  const result = await response.json();

  if (response.status === 201) {
    alert('Signup successful! Please log in.');
    window.location.href = '/login.html';
  } else {
    alert('Signup failed: ' + result.message);
  }
});
