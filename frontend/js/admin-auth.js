document.addEventListener("DOMContentLoaded", () => {  
    const loginBtn = document.getElementById("login-btn");
    const correctUsername = "admin";  // ชื่อผู้ใช้ที่ตั้งไว้
    const correctPassword = "12345";  // รหัสผ่านที่ตั้งไว้

    loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value.trim();
        const errorText = document.getElementById("login-error");

        if (!username || !password) {
            errorText.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
            errorText.style.display = "block";
            return;
        }
        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem("adminToken", "admin-session-token");
            window.location.href = "/admin-dashboard.html";
        } else {
            errorText.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
            errorText.style.display = "block";
        }
    });
});
