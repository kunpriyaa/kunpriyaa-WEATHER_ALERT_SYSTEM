// auth.js
export function handleSignUp() {
  const signupForm = document.getElementById('signup-form');
  
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (username && email) {
      alert(`สมัครสมาชิกสำเร็จ: ${username}, ${email}`);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบ');
    }
  });
}

  
  