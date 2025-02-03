const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Email and Password are required!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.status === 201) {
      alert('Signup successful! Please log in.');
      window.location.href = '/login';
    } else {
      alert(data.message || 'Signup failed');
    }
  } catch (error) {
    alert('Signup failed: ' + error.message);
  }
});